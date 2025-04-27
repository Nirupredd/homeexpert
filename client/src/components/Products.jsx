import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchAllShopGoods, fetchAllShopItems, fetchShopGoodsByCategory, fetchShopItemsByCategory } from '../services/api';
import ProductCard from './common/ProductCard';
import ProductSkeleton from './common/ProductSkeleton';
import CategoryFilter from './common/CategoryFilter';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';
  const searchQuery = searchParams.get('search') || '';
  const exactMatch = searchParams.get('exactMatch') === 'true';

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [sortOption, setSortOption] = useState('default');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [searchTerm, setSearchTerm] = useState(searchQuery);
  const [isExactMatch, setIsExactMatch] = useState(exactMatch);

  // Available categories based on database
  const filterCategories = [
    { id: 'all', name: 'All', icon: '🛒' },
    { id: 'vegetables', name: 'Vegetables', icon: '🥦' },
    { id: 'fruits', name: 'Fruits', icon: '🍎' },
    { id: 'pulses', name: 'Pulses', icon: '🌱' },
    { id: 'dairy', name: 'Dairy', icon: '🥛' },
    { id: 'groceries', name: 'Groceries', icon: '🧺' }
  ];

  // Handle category change
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    // Preserve other search params when changing category
    const newParams = { category: categoryId };
    if (searchTerm) {
      newParams.search = searchTerm;
      newParams.exactMatch = isExactMatch.toString();
    }
    setSearchParams(newParams);
  };

  // Toggle between exact and partial matching
  const toggleExactMatch = () => {
    const newExactMatch = !isExactMatch;
    setIsExactMatch(newExactMatch);

    // Update URL params
    const newParams = { ...Object.fromEntries(searchParams) };
    newParams.exactMatch = newExactMatch.toString();
    setSearchParams(newParams);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let allProducts = [];

        if (activeCategory === 'all') {
          // Fetch all products
          const shopItems = await fetchAllShopItems();
          const shopGoods = await fetchAllShopGoods();

          allProducts = [...shopItems, ...shopGoods];
        } else {
          // Fetch products by category
          const shopItems = await fetchShopItemsByCategory(activeCategory);
          const shopGoods = await fetchShopGoodsByCategory(activeCategory);

          // If no products found by category, try to filter from all products
          if (shopItems.length === 0 && shopGoods.length === 0) {
            console.log(`No products found for category: ${activeCategory}, falling back to filtering all products`);
            const allItems = await fetchAllShopItems();
            const allGoods = await fetchAllShopGoods();

            // Filter products that might match the category
            const categoryLower = activeCategory.toLowerCase();
            const filteredItems = allItems.filter(item => {
              // Check if item has category field
              if (item.category) {
                return item.category.toLowerCase() === categoryLower;
              }
              // Check if any name contains the category
              if (Array.isArray(item.name)) {
                return item.name.some(name => name.toLowerCase().includes(categoryLower));
              }
              return false;
            });

            const filteredGoods = allGoods.filter(item => {
              // Check if item has category field
              if (item.category) {
                return item.category.toLowerCase() === categoryLower;
              }
              // Check if any name contains the category
              if (Array.isArray(item.name)) {
                return item.name.some(name => name.toLowerCase().includes(categoryLower));
              }
              return false;
            });

            allProducts = [...filteredItems, ...filteredGoods];
          } else {
            allProducts = [...shopItems, ...shopGoods];
          }
        }

        // Add category to items if missing
        allProducts = allProducts.map(item => ({
          ...item,
          category: item.category || activeCategory
        }));

        setProducts(allProducts);
        setFilteredProducts(allProducts);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory]);

  // Update search term and exact match when URL parameters change
  useEffect(() => {
    setSearchTerm(searchQuery);
    setIsExactMatch(exactMatch);
  }, [searchQuery, exactMatch]);

  // Handle sorting, filtering, and search
  useEffect(() => {
    if (products.length === 0) return;

    let result = [...products];

    // Apply search filter if search term exists
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      result = result.filter(product => {
        // Check if product category matches search term (for category searches)
        if (product.category && product.category.toLowerCase() === searchTermLower) {
          return true;
        }

        // Handle array of names
        if (Array.isArray(product.name)) {
          if (isExactMatch) {
            // For exact match, check if any name exactly matches the search term
            return product.name.some(name =>
              name.toLowerCase() === searchTermLower
            );
          } else {
            // For partial match, check if any name includes the search term
            return product.name.some(name =>
              name.toLowerCase().includes(searchTermLower)
            );
          }
        } else if (typeof product.name === 'string') {
          // Handle string name
          if (isExactMatch) {
            return product.name.toLowerCase() === searchTermLower;
          } else {
            return product.name.toLowerCase().includes(searchTermLower);
          }
        }

        // Also check description for matches
        if (product.description && typeof product.description === 'string') {
          return product.description.toLowerCase().includes(searchTermLower);
        }

        return false;
      });
    }

    // Apply price filter
    result = result.filter(product => {
      const price = product.price || product.cost || 0;
      return price >= priceRange.min && price <= priceRange.max;
    });

    // Apply sorting
    if (sortOption === 'price-low-high') {
      result.sort((a, b) => {
        const priceA = a.price || a.cost || 0;
        const priceB = b.price || b.cost || 0;
        return priceA - priceB;
      });
    } else if (sortOption === 'price-high-low') {
      result.sort((a, b) => {
        const priceA = a.price || a.cost || 0;
        const priceB = b.price || b.cost || 0;
        return priceB - priceA;
      });
    }

    setFilteredProducts(result);
  }, [products, sortOption, priceRange, searchTerm, isExactMatch]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Gilroy, Arial, Helvetica Neue, sans-serif' }}>
            All Products
          </h1>
          <div className="bg-gray-100 h-12 rounded animate-pulse mb-6"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {[...Array(8)].map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 pt-24 pb-8 text-center">
        <div className="bg-red-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary-custom text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
            style={{ fontFamily: 'Gilroy, Arial, Helvetica Neue, sans-serif' }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 pb-8">
      {/* Category Filter */}
      <div className="bg-white border-b border-gray-100 shadow-sm mb-8 sticky top-16 z-10">
        <div className="container mx-auto px-4">
          <CategoryFilter
            categories={filterCategories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Gilroy, Arial, Helvetica Neue, sans-serif' }}>
            {searchTerm
              ? isExactMatch
                ? `Products matching "${searchTerm}"`
                : `Search Results for "${searchTerm}"`
              : activeCategory === 'all'
                ? 'All Products'
                : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}`
            }
          </h1>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center">
              <label htmlFor="sort" className="mr-2 text-gray-600 text-sm">Sort by:</label>
              <select
                id="sort"
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-custom/30"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="default">Default</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
              </select>
            </div>

            <div className="flex items-center">
              <label htmlFor="price-range" className="mr-2 text-gray-600 text-sm">Price Range:</label>
              <input
                type="range"
                id="price-range"
                min="0"
                max="1000"
                step="50"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                className="w-24 accent-primary-custom"
              />
              <span className="ml-2 text-sm text-gray-600">₹{priceRange.min} - ₹{priceRange.max}</span>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <p className="text-gray-600 text-sm">{filteredProducts.length} products found</p>
            {searchTerm && (
              <div className="flex items-center mt-1">
                <span className="text-xs text-gray-600 mr-2">Match type:</span>
                <button
                  onClick={toggleExactMatch}
                  className={`text-xs px-2 py-0.5 rounded-full transition-colors ${isExactMatch
                    ? 'bg-primary-custom/10 text-primary-custom'
                    : 'bg-gray-200 text-gray-600'}`}
                >
                  {isExactMatch ? 'Exact match' : 'Partial match'}
                </button>
              </div>
            )}
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-gray-50 p-8 rounded-lg text-center">
            <p className="text-gray-600 mb-4">No products found in this category.</p>
            <button
              onClick={() => handleCategoryChange('all')}
              className="bg-primary-custom text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
              style={{ fontFamily: 'Gilroy, Arial, Helvetica Neue, sans-serif' }}
            >
              View All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product._id || `product-${index}`} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
