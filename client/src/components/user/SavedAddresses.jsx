import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const SavedAddresses = () => {
  const { currentUser } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    landmark: '',
    addressType: 'home',
    isDefault: false
  });

  useEffect(() => {
    fetchAddresses();
  }, [currentUser]);

  const fetchAddresses = async () => {
    if (!currentUser?._id) return;

    try {
      const response = await fetch(`http://localhost:3000/address-api/addresses/${currentUser._id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch addresses');
      }
      
      const data = await response.json();
      setAddresses(data.payload || []);
    } catch (error) {
      console.error('Error fetching addresses:', error);
      toast.error('Failed to load saved addresses');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAddAddress = () => {
    setFormData({
      fullName: currentUser?.firstName + ' ' + (currentUser?.lastName || ''),
      mobileNumber: currentUser?.mobileNumber || '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      pincode: '',
      landmark: '',
      addressType: 'home',
      isDefault: addresses.length === 0 // Make default if it's the first address
    });
    setIsAddingAddress(true);
    setIsEditingAddress(null);
  };

  const handleEditAddress = (address) => {
    setFormData({
      fullName: address.fullName,
      mobileNumber: address.mobileNumber,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2 || '',
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      landmark: address.landmark || '',
      addressType: address.addressType,
      isDefault: address.isDefault
    });
    setIsEditingAddress(address._id);
    setIsAddingAddress(false);
  };

  const handleCancelForm = () => {
    setIsAddingAddress(false);
    setIsEditingAddress(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isAddingAddress) {
        // Add new address
        const response = await fetch('http://localhost:3000/address-api/address', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            userId: currentUser._id
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to add address');
        }

        toast.success('Address added successfully');
      } else if (isEditingAddress) {
        // Update existing address
        const response = await fetch(`http://localhost:3000/address-api/address/${isEditingAddress}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Failed to update address');
        }

        toast.success('Address updated successfully');
      }

      // Refresh addresses
      fetchAddresses();
      
      // Reset form
      setIsAddingAddress(false);
      setIsEditingAddress(null);
    } catch (error) {
      toast.error(error.message || 'Failed to save address');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetDefault = async (addressId) => {
    try {
      const response = await fetch(`http://localhost:3000/address-api/address/${addressId}/default`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Failed to set default address');
      }

      toast.success('Default address updated');
      fetchAddresses();
    } catch (error) {
      toast.error(error.message || 'Failed to set default address');
    }
  };

  const handleDeleteAddress = async (addressId) => {
    if (!window.confirm('Are you sure you want to delete this address?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/address-api/address/${addressId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete address');
      }

      toast.success('Address deleted successfully');
      fetchAddresses();
    } catch (error) {
      toast.error(error.message || 'Failed to delete address');
    }
  };

  if (isLoading && addresses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-custom"></div>
        <p className="mt-4 text-gray-600">Loading your addresses...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Saved Addresses</h2>
        {!isAddingAddress && !isEditingAddress && (
          <button
            onClick={handleAddAddress}
            className="px-4 py-2 bg-primary-custom text-white rounded-md hover:bg-opacity-90 transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Address
          </button>
        )}
      </div>

      {(isAddingAddress || isEditingAddress) ? (
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {isAddingAddress ? 'Add New Address' : 'Edit Address'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name*
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-custom/50"
                  required
                />
              </div>
              <div>
                <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number*
                </label>
                <input
                  type="tel"
                  id="mobileNumber"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-custom/50"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700 mb-1">
                Address Line 1*
              </label>
              <input
                type="text"
                id="addressLine1"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleChange}
                placeholder="House No., Building Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-custom/50"
                required
              />
            </div>

            <div>
              <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700 mb-1">
                Address Line 2
              </label>
              <input
                type="text"
                id="addressLine2"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleChange}
                placeholder="Street, Area"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-custom/50"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City*
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-custom/50"
                  required
                />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                  State*
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-custom/50"
                  required
                />
              </div>
              <div>
                <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">
                  Pincode*
                </label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-custom/50"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="landmark" className="block text-sm font-medium text-gray-700 mb-1">
                Landmark
              </label>
              <input
                type="text"
                id="landmark"
                name="landmark"
                value={formData.landmark}
                onChange={handleChange}
                placeholder="Nearby landmark (optional)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-custom/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address Type
              </label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="addressType"
                    value="home"
                    checked={formData.addressType === 'home'}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary-custom focus:ring-primary-custom/50 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Home</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="addressType"
                    value="work"
                    checked={formData.addressType === 'work'}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary-custom focus:ring-primary-custom/50 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Work</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="addressType"
                    value="other"
                    checked={formData.addressType === 'other'}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary-custom focus:ring-primary-custom/50 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Other</span>
                </label>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="isDefault"
                name="isDefault"
                type="checkbox"
                checked={formData.isDefault}
                onChange={handleChange}
                className="h-4 w-4 text-primary-custom focus:ring-primary-custom/50 border-gray-300 rounded"
              />
              <label htmlFor="isDefault" className="ml-2 block text-sm text-gray-700">
                Set as default address
              </label>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={handleCancelForm}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary-custom text-white rounded-md hover:bg-opacity-90 transition-colors"
              >
                {isAddingAddress ? 'Add Address' : 'Update Address'}
              </button>
            </div>
          </form>
        </div>
      ) : addresses.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900">No addresses saved</h3>
          <p className="mt-1 text-gray-500">Add an address to make checkout faster.</p>
          <button
            onClick={handleAddAddress}
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-custom hover:bg-opacity-90 focus:outline-none"
          >
            Add New Address
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <div
              key={address._id}
              className={`border rounded-lg p-4 relative ${
                address.isDefault ? 'border-primary-custom bg-primary-custom/5' : 'border-gray-200'
              }`}
            >
              {address.isDefault && (
                <span className="absolute top-2 right-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-custom text-white">
                  Default
                </span>
              )}
              
              <div className="flex items-start mb-2">
                <div className={`p-2 rounded-full ${
                  address.addressType === 'home' ? 'bg-blue-100 text-blue-600' :
                  address.addressType === 'work' ? 'bg-green-100 text-green-600' :
                  'bg-purple-100 text-purple-600'
                }`}>
                  {address.addressType === 'home' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  ) : address.addressType === 'work' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </div>
                <div className="ml-3 mt-1">
                  <h3 className="text-base font-medium text-gray-900 capitalize">{address.addressType}</h3>
                </div>
              </div>
              
              <div className="mt-4 mb-2">
                <p className="text-sm font-medium text-gray-900">{address.fullName}</p>
                <p className="text-sm text-gray-600 mt-1">{address.addressLine1}</p>
                {address.addressLine2 && <p className="text-sm text-gray-600">{address.addressLine2}</p>}
                <p className="text-sm text-gray-600">{address.city}, {address.state} - {address.pincode}</p>
                {address.landmark && <p className="text-sm text-gray-600">Landmark: {address.landmark}</p>}
                <p className="text-sm text-gray-600 mt-1">Phone: {address.mobileNumber}</p>
              </div>
              
              <div className="mt-4 flex space-x-3">
                <button
                  onClick={() => handleEditAddress(address)}
                  className="text-sm text-primary-custom hover:text-primary-custom/80"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteAddress(address._id)}
                  className="text-sm text-red-600 hover:text-red-500"
                >
                  Delete
                </button>
                {!address.isDefault && (
                  <button
                    onClick={() => handleSetDefault(address._id)}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    Set as Default
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedAddresses;
