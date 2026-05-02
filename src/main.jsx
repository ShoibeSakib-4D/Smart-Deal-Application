import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from './components/layouts/RootLayout.jsx';
import Home from './components/home/Home.jsx';
import AllProducts from './components/allProducts/AllProducts.jsx';
import AuthProvider from './context/AuthProvider.jsx';
import Login from './components/authentication/Login.jsx';
import Register from './components/authentication/Register.jsx';
import MyProducts from './components/myProdicts/MyProducts.jsx';
import MyBids from './components/myBids/MyBids.jsx';
import ProductDetails from './components/productDetails/ProductDetails.jsx';
import PrivateRoute from './components/routes/PrivateRoute.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component : RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "allProducts",
        element: <PrivateRoute><AllProducts></AllProducts></PrivateRoute>
      },
      {
        path: "login",
        Component: Login
      }
      ,
      {
        path: "register",
        Component: Register
      },
      {
        path:"myProducts",
        element :<PrivateRoute> <MyProducts></MyProducts></PrivateRoute>

      },
      {
        path: "myBids",
        element: <PrivateRoute><MyBids></MyBids></PrivateRoute>
      },
      {
        path: "productDetail/:id",
        loader : ({params}) => fetch(`http://localhost:5000/products/${params.id}`),
        element: <ProductDetails></ProductDetails>
      }

    ]
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>

    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  
  </StrictMode>
)
