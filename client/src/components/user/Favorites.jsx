import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Favorites = () => {
  const { currentUser } = useAuth();
  const { addToCart } = useCart();
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, [currentUser]);

  const fetchFavorites = async () => {
    if (!currentUser?._id) return;

    try {
      const response = await fetch(`http://localhost:3000/favorite-api/favorites/${currentUser._id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch favorites');
      }
      
      const data = await response.json();
      setFavorites(data.payload || []);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      toast.error('Failed to load favorites');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFavorite = async (favoriteId) => {
    try {
      const response = await fetch(`http://localhost:3000/favorite-api/favorite/${favoriteId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to remove from favorites');
      }

      // Update local state
      setFavorites(favorites.filter(fav => fav._id !== favoriteId));
      toast.success('Removed from favorites');
    } catch (error) {
      toast.error(error.message || 'Failed to remove from favorites');
    }
  };

  const handleAddToCart = (product) => {
    const cartItem = {
      id: product.productId,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
      productType: product.productType
    };
    
    addToCart(cartItem);
    toast.success('Added to cart');
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-custom"></div>
        <p className="mt-4 text-gray-600">Loading your favorites...</p>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900">No favorites yet</h3>
        <p className="mt-1 text-gray-500">Items you like will appear here.</p>
        <Link
          to="/products"
          className="mt-6 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-custom hover:bg-opacity-90 focus:outline-none"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Favorites</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {favorites.map((favorite) => (
          <div key={favorite._id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative">
              <img
                src={favorite.imageUrl}
                alt={favorite.name}
                className="w-full h-48 object-cover"
              />
              <button
                onClick={() => handleRemoveFavorite(favorite._id)}
                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-1">{favorite.name}</h3>
              <p className="text-primary-custom font-bold mb-3">₹{favorite.price.toFixed(2)}</p>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handleAddToCart(favorite)}
                  className="flex-1 bg-primary-custom text-white py-2 rounded-md hover:bg-opacity-90 transition-colors text-sm"
                >
                  Add to Cart
                </button>
                <Link
                  to={`/products?productId=${favorite.productId}`}
                  className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm"
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
