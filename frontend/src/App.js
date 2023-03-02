import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout, { loader as rootLoader } from './pages/RootLayout';
import Error from './pages/Error';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails, {
   loader as ProductLoader,
   action as productDetailsAction,
} from './pages/ProductDetails';
import Cart from './pages/Cart';
import Auth, { action as AuthAction } from './pages/Auth';
import { action as logoutAction } from './pages/Logout';
import EditProduct from './pages/EditProduct';
import { action as productAction } from './components/ProductForm';
import { checkAuthLoader } from './util/auth';
import AddProduct from './pages/AddProduct';
import { CartContextProvider } from './context/cart-context';

export default function App() {
   const router = createBrowserRouter([
      {
         path: '/',
         element: <RootLayout />,
         loader: rootLoader,
         errorElement: <Error />,
         id: 'root',
         children: [
            {
               index: true,
               element: <Home />,
            },
            {
               path: 'products',
               children: [
                  {
                     index: true,
                     element: <Products />,
                  },
                  {
                     path: ':productId',
                     id: 'product',
                     loader: ProductLoader,
                     children: [
                        {
                           index: true,
                           element: <ProductDetails />,
                           action: productDetailsAction,
                        },
                        {
                           path: 'edit',
                           element: <EditProduct />,
                           action: productAction,
                           loader: checkAuthLoader,
                        },
                     ],
                  },
               ],
            },
            {
               path: 'new',
               element: <AddProduct />,
               action: productAction,
               loader: checkAuthLoader,
            },
            {
               path: 'cart',
               loader: checkAuthLoader,
               element: (
                  <CartContextProvider>
                     <Cart />
                  </CartContextProvider>
               ),
            },
            {
               path: 'auth',
               element: <Auth />,
               action: AuthAction,
            },
            { path: 'logout', action: logoutAction },
         ],
      },
   ]);

   return <RouterProvider router={router} />;
}
