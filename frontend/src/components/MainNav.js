import React, { useRef, useContext } from 'react';
import { NavLink, useRouteLoaderData, Form } from 'react-router-dom';
import styles from './MainNav.module.css';
import Menu from '../components/Menu';
import CartContext from '../context/cart-context';

export default function MainNav() {
   const token = useRouteLoaderData('root').token;
   const ul = useRef(null);
   const { emptyCart } = useContext(CartContext);

   function toggleMenu() {
      const displayValue = getComputedStyle(ul.current).getPropertyValue(
         'display'
      );

      if (displayValue === 'none') {
         ul.current.style.display = 'flex';
      } else {
         ul.current.style.display = 'none';
      }
   }

   function closeNav(e) {
      if (window.innerWidth > 750) return;

      if (e.target.closest('a')) {
         ul.current.style.display = 'none';
      }
   }

   return (
      <nav className={styles.nav} onClick={closeNav}>
         <button className={styles.hamburger} onClick={toggleMenu}>
            <Menu />
         </button>
         <ul className={styles['nav-links']} ref={ul}>
            <li>
               <NavLink
                  to=""
                  className={({ isActive }) => (isActive ? styles.active : '')}
               >
                  Home
               </NavLink>
            </li>
            <li>
               <NavLink
                  to="products"
                  className={({ isActive }) => (isActive ? styles.active : '')}
               >
                  Products
               </NavLink>
            </li>
            {!token && (
               <li>
                  <NavLink
                     to="/auth?mode=login"
                     className={({ isActive }) =>
                        isActive ? styles.active : undefined
                     }
                  >
                     Login
                  </NavLink>
               </li>
            )}
            {token && (
               <>
                  <li>
                     <NavLink
                        to="cart"
                        className={({ isActive }) =>
                           isActive ? styles.active : ''
                        }
                     >
                        Cart
                     </NavLink>
                  </li>
                  <li>
                     <NavLink
                        to="/new"
                        className={({ isActive }) =>
                           isActive ? styles.active : undefined
                        }
                     >
                        Add Product
                     </NavLink>
                  </li>
                  <li>
                     <Form action="/logout" method="post">
                        <button onClick={emptyCart}>Logout</button>
                     </Form>
                  </li>
               </>
            )}
         </ul>
      </nav>
   );
}
