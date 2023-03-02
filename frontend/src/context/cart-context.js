import React, { useState } from 'react';

const CartContext = React.createContext();

let cart = [];
export function CartContextProvider(props) {
   function emptyCart() {
      cart = [];
   }

   const [newCart, setNewCart] = useState([...cart]);

   function addToCart(product) {
      if (cart.find((item) => item.id === product.id)) {
         return;
      }

      cart.push(product);
      setNewCart([...cart]);
   }

   function removeFromCart(id) {
      cart = cart.filter((item) => item.id !== id);
      setNewCart([...cart]);
   }

   const data = { newCart, addToCart, removeFromCart, emptyCart };
   return (
      <CartContext.Provider value={data}>{props.children}</CartContext.Provider>
   );
}

export default CartContext;
