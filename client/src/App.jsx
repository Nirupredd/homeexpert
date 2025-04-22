import React from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import RootLayout from './components/RootLayout'
import Home from './components/Home'
import Cart from './components/Cart'
import Products from './components/Products'
import './App.css';
function App() {
  const browserRouterObj = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "",
          element: <Home />
        },
        {
          path: "cart",
          element: <Cart />
        },
        {
          path: "products",
          element: <Products />
        }
      ]
    }
  ])
  return (
    <div>
      <RouterProvider router={browserRouterObj} />
    </div>
  )
}

export default App




