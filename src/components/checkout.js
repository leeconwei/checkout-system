import React, { useEffect, useState } from "react";
import { productList, pricingRules } from "../utils/data";

import './checkout.scss';

export default function Checkout({ cartItems }) {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [recipientLevel, setRecipientLevel] = useState('');

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
                  subtotal: parseFloat((el.discountPrice*cartProduct.quantity))
                };
              } else if (
                el.discountQuantity
              ) {
                updatedCartProduct = {
                  ...cartProduct,
                  subtotal: 
                  parseFloat(((cartProduct.price*((~~(cartProduct.quantity / el.minQuantity) * el.discountQuantity)))+
                  ((cartProduct.quantity % el.minQuantity)*((cartProduct.price * (100 - normalDiscount)) / 100 ))))
                };
              }
            } else if (updatedCartProduct?.item !== cartProduct.item) {
              updatedCartProduct = {
                ...cartProduct,
                subtotal: parseFloat((cartProduct.quantity*((cartProduct.price * (100 - normalDiscount)) / 100 )))
              };
            }
          })
        );
      } else {
        updatedCartProduct = {
          ...cartProduct,
          subtotal: parseFloat((cartProduct.quantity*(cartProduct.price * (100 - normalDiscount)) / 100))
        };
      }
      return updatedCartProduct;
    });
    calcTotal(updatedCart);
  };

  const updateLevel = (e) => {
    setRecipientLevel(e.target.value);
  }

  const toggleCartItemQuantity = (name, value) => {

    const foundProduct = cart.find((cartItem)=> cartItem.item === name);
    const newCart = cart.filter((cartItem) => cartItem.item !== name)
    
    if(value === 'inc') {
      setCart([...newCart, { ...foundProduct, quantity: foundProduct.quantity + 1 } ]);
      
    } else if (value === 'dec') {
      if(foundProduct.quantity > 1 ){
        setCart([...newCart, { ...foundProduct, quantity: foundProduct.quantity - 1 } ]);
      } else {
        setCart(newCart);
      }
    }
  }

  useEffect(() => {
    setCartList(cartItems);
  }, []);

  useEffect(() => {
    if (cart) {
      calcDiscount(cart, recipientLevel);
    }
  }, [cart, recipientLevel]);

  return (
   
    <div className="checkout">
      <h1>This is the checkout page</h1>

      <div className="checkout-details">
        <div className="checkout-details-recipient">
          <div className="checkout-details-title">Level</div>
          <div className="checkout-details-level">
            <div>Please select a level</div>
            <div className="checkout-details-selectlevel">
              { pricingRules.map((rule)=>Object.keys(rule.level).map((level)=>(
                
                  <div key={level}><span>{level}</span><input type="radio" name="level" data-testid={level} value={level} onChange={updateLevel}/></div>
              )))}
            </div>
          </div>

          {recipientLevel && pricingRules.map((rule, index) => 
            <div className="checkout-details-pricing" key={index}>
              <div>
                <span>{recipientLevel}</span> user perks
                <ul>
                  <li>{rule.level[recipientLevel]?.normalDiscount}% off on non-promotional products</li>
                </ul>
              </div>

              {rule.level[recipientLevel]?.itemDiscount &&
              <div>
              Special Promo
              {rule.level[recipientLevel]?.itemDiscount.map((product, index) =>(
                <ul key={index}>
                  {product.discountPrice && <li>Get a discount on {product.item} where {product.minQuantity} or more purchased. The price dropped to RM {product.discountPrice} per unit</li>}
                  {product.discountQuantity && <li>Get a {product.minQuantity} for {product.discountQuantity} deal on {product.item}</li>}
                </ul>
              ))}
              </div>}
            </div>
          )}
        </div>
  
        <div className="checkout-details-cart">
          <div className="checkout-details-title">Products</div>
          <table>
            <thead>
            <tr>
              <th>Product</th>
              <th>Price(RM)</th>
              <th>Amount</th>
            </tr>
            </thead>
            <tbody>
            {cart.map((cart) => {
              return (
                <tr key={cart.item}>
                  <td>{cart.item}</td>
                  <td className="text-center">{cart.price}</td>
                  <td className="text-center" data-testid={`quantity-${cart.item}`}>
                    <button data-testid={`dec-${cart.item}`}  onClick={()=>toggleCartItemQuantity(cart.item, 'dec')}>-</button>
                    {cart.quantity}
                    <button data-testid={`inc-${cart.item}`} onClick={()=>toggleCartItemQuantity(cart.item, 'inc')}>+</button>
                  </td>
                </tr>
              )
            }).sort((a,b)=>{if(a.key < b.key){return -1}if(a.key>b.key){return 1} return 0})}
            </tbody>
          </table>
          <div className="checkout-total">
            <div>
              <div>Total: RM <span>{total}</span></div>
              <div>Amount to pay is, RM {total}</div>
            </div>
            <div>
              <button>Pay Now</button>
            </div>
          </div>
        </div>
      </div>
      </div>
  );
}