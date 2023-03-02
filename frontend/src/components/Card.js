import React from 'react';
import styles from './Card.module.css';
import Stars from './Stars';

export default function Card({ product }) {
   return (
      <div className={styles.card}>
         <div className={styles.img}>
            <img src={product.image} alt={product.title} />
         </div>
         <div className={styles.info}>
            <h3>{product.title}</h3>
            <p>Cost: {product.cost}$</p>
            <Stars length={product.rating} />
         </div>
      </div>
   );
}
