import React, { useEffect, useState } from "react";
import { productList, pricingRules } from "../utils/data";

export default function Checkout({ recipient, cartItems }) {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const setCartList = (cartItems) => {
    const cartItemsQuantity = cartItems?.reduce((accumulator, current) => {
      return { ...accumulator, [current]: accumulator[current] + 1 || 1 };
    }, {});
    cartItemsQuantity &&
      Object.entries(cartItemsQuantity).forEach(([item, quantity]) => {
        setCart((prevCart) => [
          ...prevCart,
          {
            item,
            quantity,
            price: parseFloat(productList
              .find((product) => product.name === item)
              .price.toFixed(2))
          }
        ]);
      });
  };

  const calcTotal = (updatedCart) => {
    let cartTotal = updatedCart.reduce((accumulator, current) => accumulator + current.subtotal,0);
    setTotal(parseFloat(cartTotal.toFixed(2)));
  };

  const calcDiscount = (cart, recipient) => {
    const recipientLevel = recipient?.toLowerCase();

    const itemDiscount = pricingRules.map(
      (rule) => rule.level[recipientLevel]?.itemDiscount
    );

    const normalDiscount = pricingRules.map(
      (rule) => rule.level[recipientLevel]?.normalDiscount
    );

    const updatedCart = cart.map((cartProduct) => {
      let updatedCartProduct;
      if (!itemDiscount.includes(undefined)) {
        itemDiscount.map((product) =>
          product.find((el) => {
            if (el.item === cartProduct.item) {
              if (el.discountPrice && cartProduct.quantity >= el.minQuantity) {
                updatedCartProduct = {
                  ...cartProduct,
                  subtotal: parseFloat((el.discountPrice*cartProduct.quantity).toFixed(2))
                };
              } else if (
                el.discountQuantity
              ) {
                updatedCartProduct = {
                  ...cartProduct,
                  subtotal: 
                  parseFloat(((cartProduct.price*((~~(cartProduct.quantity / el.minQuantity) * el.discountQuantity)))+
                  ((cartProduct.quantity % el.minQuantity)*((cartProduct.price * (100 - normalDiscount)) / 100 ))).toFixed(2))
                };
              }
            } else if (updatedCartProduct?.item !== cartProduct.item) {
              updatedCartProduct = {
                ...cartProduct,
                subtotal: parseFloat((cartProduct.quantity*((cartProduct.price * (100 - normalDiscount)) / 100 )).toFixed(2))
              };
            }
          })
        );
      } else {
        updatedCartProduct = {
          ...cartProduct,
          subtotal: parseFloat((cartProduct.quantity*(cartProduct.price * (100 - normalDiscount)) / 100).toFixed(2))
        };
      }
      return updatedCartProduct;
    });
    calcTotal(updatedCart);
  };

  useEffect(() => {
    setCartList(cartItems);
  }, []);

  useEffect(() => {
    if (cart) {
      calcDiscount(cart, recipient);
    }
  }, [cart]);

  return (
    <div>
    <h1>Checkout System</h1>
      <div>Recipient: {recipient}</div>
      <br />
      <div>
        Cart Items:
        <ul>
          {cart.map((cartItem) => (
            <li key={cartItem.item}>{cartItem.item}</li>
          ))}
        </ul>
      </div>
      <div>
        Total: RM <span id="total">{total}</span>
      </div>
    </div>
  );
}
