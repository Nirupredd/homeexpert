import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the cart context
const CartContext = createContext();

// Custom hook to use the cart context
export const useCart = () => {
  return useContext(CartContext);
};

// Cart provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        setCartItems([]);
      }
    }
  }, []);

  // Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));

    // Calculate cart count and total
    const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    setCartCount(itemCount);

    const total = cartItems.reduce((total, item) => {
      const price = item.price || item.cost || 0;
      return total + (price * item.quantity);
    }, 0);
    setCartTotal(total);
  }, [cartItems]);

  // Add item to cart
  const addToCart = (product) => {
    // Log the product being added
    console.log('Adding product to cart:', product);

    // Create a unique identifier for the product
    const productId = product._id ||
                     (product.name && (Array.isArray(product.name) ? product.name[0] : product.name)) ||
                     Math.random().toString(36).substring(2, 15);

    setCartItems(prevItems => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(item => {
        const itemId = item._id ||
                      (item.name && (Array.isArray(item.name) ? item.name[0] : item.name)) ||
                      '';
        return itemId === productId;
      });

      console.log('Existing item index:', existingItemIndex);

      if (existingItemIndex !== -1) {
        // Item exists, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        console.log('Updated items:', updatedItems);
        return updatedItems;
      } else {
        // Item doesn't exist, add new item
        const newItem = { ...product, _id: productId, quantity: 1 };
        console.log('New item:', newItem);
        return [...prevItems, newItem];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    console.log('Removing product with ID:', productId);
    setCartItems(prevItems => {
      const newItems = prevItems.filter(item => {
        const itemId = item._id ||
                     (item.name && (Array.isArray(item.name) ? item.name[0] : item.name)) ||
                     '';
        return itemId !== productId;
      });
      console.log('Items after removal:', newItems);
      return newItems;
    });
  };

  // Update item quantity
  const updateQuantity = (productId, quantity) => {
    console.log('Updating quantity for product ID:', productId, 'to', quantity);

    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item => {
        const itemId = item._id ||
                     (item.name && (Array.isArray(item.name) ? item.name[0] : item.name)) ||
                     '';
        return itemId === productId ? { ...item, quantity } : item;
      });
      console.log('Items after quantity update:', updatedItems);
      return updatedItems;
    });
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
    console.log('Cart cleared');
  };

  // Context value
  const value = {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
