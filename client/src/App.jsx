import React from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import RootLayout from './components/RootLayout'
import Home from './components/Home'
import Cart from './components/Cart'
import Products from './components/Products'
import UserDashboard from './components/user/UserDashboard'
import AuthModal from './components/auth/AuthModal'
import './App.css';
import { useAuth } from './context/AuthContext'

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return children;
};

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
        },
        {
          path: "account",
          element: <ProtectedRoute><UserDashboard /></ProtectedRoute>
        }
      ]
    }
  ])
  return (
    <div className="relative">
      <RouterProvider router={browserRouterObj} />
      <AuthModal />
    </div>
  )
}

export default App




