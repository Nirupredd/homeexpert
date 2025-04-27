import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the auth context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [otpSent, setOtpSent] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
        setCurrentUser(null);
      }
    }
    setLoading(false);
  }, []);

  // Update localStorage whenever user changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  // Register a new user
  const register = async (userData) => {
    try {
      const response = await fetch('http://localhost:3000/user-api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const data = await response.json();
      return data.payload;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  // Check if user exists by mobile number
  const checkUserExists = async (phone) => {
    try {
      const response = await fetch(`http://localhost:3000/user-api/check-user/${phone}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to check user');
      }

      const data = await response.json();
      return data.exists;
    } catch (error) {
      console.error('Check user error:', error);
      throw error;
    }
  };

  // Send OTP to phone number
  const sendOTP = async (phone) => {
    try {
      // Use the regular send-otp endpoint
      const response = await fetch('http://localhost:3000/user-api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobileNumber: phone }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send OTP');
      }

      const data = await response.json();
      setPhoneNumber(phone);
      setOtpSent(true);
      return data;
    } catch (error) {
      console.error('Send OTP error:', error);
      throw error;
    }
  };

  // Resend OTP to phone number
  const resendOTP = async (phone) => {
    try {
      // Use the resend-otp endpoint
      const response = await fetch('http://localhost:3000/user-api/resend-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobileNumber: phone || phoneNumber }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to resend OTP');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Resend OTP error:', error);
      throw error;
    }
  };

  // Verify OTP
  const verifyOTP = async (otp) => {
    try {
      const response = await fetch('http://localhost:3000/user-api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobileNumber: phoneNumber, otp }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'OTP verification failed');
      }

      const data = await response.json();

      // Cart items are already stored in localStorage by the CartContext
      // No need to do anything special here to preserve them

      setCurrentUser(data.payload);
      setOtpSent(false);
      setAuthModalOpen(false);
      document.body.classList.remove('modal-open');
      return data.payload;
    } catch (error) {
      console.error('Verify OTP error:', error);
      throw error;
    }
  };

  // Logout user
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  // Open auth modal
  const openAuthModal = (mode = 'login') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
    setOtpSent(false);
    document.body.classList.add('modal-open');
  };

  // Close auth modal
  const closeAuthModal = () => {
    setAuthModalOpen(false);
    setOtpSent(false);
    document.body.classList.remove('modal-open');
  };

  // Switch between login and register modes
  const switchAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'register' : 'login');
    setOtpSent(false);
  };

  // Context value
  const value = {
    currentUser,
    loading,
    authModalOpen,
    authMode,
    otpSent,
    phoneNumber,
    register,
    checkUserExists,
    sendOTP,
    resendOTP,
    verifyOTP,
    logout,
    openAuthModal,
    closeAuthModal,
    switchAuthMode,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
