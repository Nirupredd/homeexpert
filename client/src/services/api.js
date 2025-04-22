// API service for fetching data from the backend

const API_BASE_URL = 'http://localhost:3000'; // Make sure this matches your server port

/**
 * Helper function to handle API responses
 */
const handleApiResponse = async (response, errorMessage) => {
  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error');
    console.error(`API Error (${response.status}): ${errorText}`);
    throw new Error(`${errorMessage} (Status: ${response.status})`);
  }

  const data = await response.json();
  console.log('API Response:', data);

  // Check if payload exists and is valid
  if (!data || !data.payload) {
    console.warn('API response missing payload:', data);
    return [];
  }

  return data.payload;
};

/**
 * Helper function to add category to items if missing
 */
const addCategoryToItems = (items, category) => {
  if (!items || !Array.isArray(items)) return [];

  return items.map(item => {
    if (!item.category) {
      return { ...item, category };
    }
    return item;
  });
};

// Fetch all shop goods
export const fetchAllShopGoods = async () => {
  try {
    console.log('Fetching all shop goods...');
    const response = await fetch(`${API_BASE_URL}/shopgoods-api/shopGoods`);
    return await handleApiResponse(response, 'Failed to fetch shop goods');
  } catch (error) {
    console.error('Error fetching shop goods:', error);
    return [];
  }
};

// Fetch shop goods by category
export const fetchShopGoodsByCategory = async (category) => {
  try {
    console.log(`Fetching shop goods for category: ${category}...`);

    // Use the category endpoint from the HTTP file
    const response = await fetch(`${API_BASE_URL}/shopgoods-api/shopGood/category/${category}`);
    const data = await handleApiResponse(response, `Failed to fetch shop goods for category: ${category}`);

    // Add category to items if it's missing
    return addCategoryToItems(data, category);
  } catch (error) {
    console.error(`Error fetching shop goods for category ${category}:`, error);

    // If category endpoint fails, try fetching all goods
    try {
      console.log(`Falling back to all goods for category: ${category}`);
      const response = await fetch(`${API_BASE_URL}/shopgoods-api/shopGoods`);
      const allGoods = await handleApiResponse(response, 'Failed to fetch shop goods');

      // Return all goods with the category added
      return addCategoryToItems(allGoods, category);
    } catch (fallbackError) {
      console.error('Fallback error:', fallbackError);
      return [];
    }
  }
};

// Fetch all shop items
export const fetchAllShopItems = async () => {
  try {
    console.log('Fetching all shop items...');
    const response = await fetch(`${API_BASE_URL}/shopitems-api/shopitems`);
    return await handleApiResponse(response, 'Failed to fetch shop items');
  } catch (error) {
    console.error('Error fetching shop items:', error);
    return [];
  }
};

// Fetch shop items by category
export const fetchShopItemsByCategory = async (category) => {
  try {
    console.log(`Fetching shop items for category: ${category}...`);

    // Use the category endpoint from the HTTP file
    const response = await fetch(`${API_BASE_URL}/shopitems-api/shopItem/category/${category}`);
    const data = await handleApiResponse(response, `Failed to fetch shop items for category: ${category}`);

    // Add category to items if it's missing
    return addCategoryToItems(data, category);
  } catch (error) {
    console.error(`Error fetching shop items for category ${category}:`, error);

    // If category endpoint fails, try fetching all items
    try {
      console.log(`Falling back to all items for category: ${category}`);
      const response = await fetch(`${API_BASE_URL}/shopitems-api/shopitems`);
      const allItems = await handleApiResponse(response, 'Failed to fetch shop items');

      // Return all items with the category added
      return addCategoryToItems(allItems, category);
    } catch (fallbackError) {
      console.error('Fallback error:', fallbackError);
      return [];
    }
  }
};
