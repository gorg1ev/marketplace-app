import React, { useContext } from 'react';
import styles from './CartItem.module.css';
import XItem from './XIcon';
import CartContext from '../context/cart-context';

export default function CartItem({ item }) {
   const data = useContext(CartContext);

   return (
      <div className={styles.item}>
         <div className={styles.img}>
            <img src={item.image} alt={item.title} />
         </div>
         <div className={styles.info}>
            <div className={styles.details}>
               <h1>{item.title}</h1>
               <p>Cost: ${item.cost}</p>
            </div>
            <div onClick={data.removeFromCart.bind(null, item.id)}>
               <XItem />
            </div>
         </div>
      </div>
   );
}
