import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  console.log('Cart component rendered');
  console.log('Cart items from context:', cartItems);
  console.log('Cart from localStorage:', localStorage.getItem('cart'));

  // Handle empty cart
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Gilroy, Arial, Helvetica Neue, sans-serif' }}>
            Your Cart
          </h1>
          <button
            onClick={() => {
              console.log('Debug - Cart items:', cartItems);
              console.log('Debug - localStorage cart:', localStorage.getItem('cart'));
              alert('Check console for cart debug info');
            }}
            className="text-sm text-gray-500 hover:text-primary-custom"
          >
            Debug Cart
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto mb-4 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <Link
            to="/"
            className="bg-primary-custom text-white px-4 py-2 rounded-md hover:bg-opacity-80 hover:shadow-md transition-all duration-300 transform hover:scale-105 inline-block"
            style={{ fontFamily: 'Gilroy, Arial, Helvetica Neue, sans-serif' }}
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Gilroy, Arial, Helvetica Neue, sans-serif' }}>
          Your Cart
        </h1>
        <button
          onClick={() => {
            console.log('Debug - Cart items:', cartItems);
            console.log('Debug - localStorage cart:', localStorage.getItem('cart'));
            alert('Check console for cart debug info');
          }}
          className="text-sm text-gray-500 hover:text-primary-custom"
        >
          Debug Cart
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Cart Items */}
        <div className="md:w-2/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-800">Items ({cartItems.length})</h2>
            </div>

            <ul className="divide-y divide-gray-200">
              {cartItems.map((item, index) => {
                // Handle different data structures between shop goods and shop items
                let displayName = 'Product';
                if (Array.isArray(item.name) && item.name.length > 0) {
                  displayName = item.name[0];
                } else if (typeof item.name === 'string') {
                  displayName = item.name;
                }

                // Use a default image if imageUrl is missing
                const imageUrl = item.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image';

                // Handle different price properties (cost or price)
                const price = item.cost || item.price || 0;

                return (
                  <li key={item._id || index} className="p-4 flex flex-col sm:flex-row items-start sm:items-center">
                    <div className="w-full sm:w-24 h-24 flex-shrink-0 mb-4 sm:mb-0">
                      <img
                        src={imageUrl}
                        alt={displayName}
                        className="w-full h-full object-cover rounded-md"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/300x200?text=Error+Loading+Image';
                        }}
                      />
                    </div>

                    <div className="flex-1 ml-0 sm:ml-4">
                      <h3 className="text-lg font-medium text-gray-800">{displayName}</h3>
                      <p className="text-primary-custom font-medium">₹{price}</p>
                    </div>

                    <div className="flex items-center mt-4 sm:mt-0">
                      <button
                        onClick={() => updateQuantity(item._id || (Array.isArray(item.name) ? item.name[0] : item.name), item.quantity - 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="mx-2 w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item._id || (Array.isArray(item.name) ? item.name[0] : item.name), item.quantity + 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                      >
                        +
                      </button>

                      <button
                        onClick={() => removeFromCart(item._id || (Array.isArray(item.name) ? item.name[0] : item.name))}
                        className="ml-4 text-red-500 hover:text-red-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="p-4 border-t flex justify-between">
              <button
                onClick={clearCart}
                className="text-red-500 hover:text-red-700 flex items-center transition-all duration-300 hover:scale-105"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear Cart
              </button>

              <button
                onClick={() => {
                  localStorage.removeItem('cart');
                  window.location.reload();
                }}
                className="text-blue-500 hover:text-blue-700 flex items-center transition-all duration-300 hover:scale-105"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset Cart
              </button>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="md:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>

            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">₹{cartTotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">₹40.00</span>
            </div>

            <div className="border-t border-gray-200 my-4"></div>

            <div className="flex justify-between mb-6">
              <span className="text-lg font-semibold text-gray-800">Total</span>
              <span className="text-lg font-semibold text-primary-custom">₹{(cartTotal + 40).toFixed(2)}</span>
            </div>

            <button
              className="w-full bg-primary-custom text-white py-3 rounded-md hover:bg-opacity-80 hover:shadow-md transition-all duration-300 transform hover:scale-105"
              style={{ fontFamily: 'Gilroy, Arial, Helvetica Neue, sans-serif' }}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
