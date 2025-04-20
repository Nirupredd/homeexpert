import React from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import RootLayout from './components/RootLayout'
import './App.css';
function App() {
  const browserRouterObj = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: []
    }
  ])
  return (
    <div>
      <RouterProvider router={browserRouterObj} />
    </div>
  )
}

export default App




