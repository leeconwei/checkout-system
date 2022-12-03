export const productList = [
    {
      id: 1,
      name: "Kone",
      price: 3488.99
    },
    {
      id: 2,
      name: "Ironhide Cartridge",
      price: 529.99
    }
  ];
  
  export const pricingRules = [
    {
      level: {
        associate: {
          normalDiscount: 5
        },
        diamond: {
          normalDiscount: 20,
          itemDiscount: [
            {
              item: "Kone",
              minQuantity: 3,
              discountPrice: 2588.99,
              discountQuantity: null
            },
            {
              item: "Ironhide Cartridge",
              minQuantity: 3,
              discountPrice: null,
              discountQuantity: 2
            }
          ]
        }
      }
    }
  ];