// Search API - handles searching and filtering tours
import { tours, services } from '../../packages/api/data.js';

/**
 * Parse price string to number
 * @param {string} priceStr - Price string like "34€"
 * @returns {number} - Numeric price value
 */
const parsePrice = (priceStr) => {
  return parseFloat(priceStr.replace(/[^0-9.]/g, ''));
};

/**
 * Parse duration string to hours
 * @param {string} durationStr - Duration string like "2.5 hour" or "3 hours"
 * @returns {number} - Duration in hours
 */
const parseDuration = (durationStr) => {
  return parseFloat(durationStr.replace(/[^0-9.]/g, ''));
};

/**
 * Get duration category
 * @param {number} hours - Duration in hours
 * @returns {string} - Duration category
 */
const getDurationCategory = (hours) => {
  if (hours <= 4) return 'halfDay';
  if (hours <= 8) return 'fullDay';
  return 'multiDay';
};

/**
 * Search tours based on query and filters
 * @param {Object} params - Search parameters
 * @param {string} params.query - Search query text
 * @param {Object} params.filters - Filter options
 * @param {string} params.sortBy - Sort option
 * @param {Function} t - Translation function
 * @returns {Array} - Filtered and sorted tours
 */
export const searchTours = ({ query = '', filters = {}, sortBy = 'recommended' }, t) => {
  let results = [...tours];

  // Text search - search in title (only filter if query is not empty)
  if (query && query.trim()) {
    const searchLower = query.toLowerCase().trim();
    results = results.filter(tour => {
      const title = t ? t(tour.titleKey).toLowerCase() : tour.titleKey.toLowerCase();
      const desc = tour.desc ? tour.desc.toLowerCase() : '';
      return title.includes(searchLower) || desc.includes(searchLower);
    });
  }

  // Filter by category
  if (filters.category && filters.category !== 'all') {
    // For now, all items are tours. Can be extended for other categories
    if (filters.category === 'tours') {
      // Keep all tours
    } else if (filters.category === 'activities') {
      results = results.filter(tour => {
        const title = t ? t(tour.titleKey).toLowerCase() : '';
        return title.includes('tour') || title.includes('tasting');
      });
    } else if (filters.category === 'transportation') {
      results = results.filter(tour => {
        const title = t ? t(tour.titleKey).toLowerCase() : '';
        return title.includes('bike') || title.includes('coach');
      });
    }
  }

  // Filter by price range
  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    results = results.filter(tour => {
      const price = parsePrice(tour.price);
      const minOk = filters.minPrice === undefined || price >= filters.minPrice;
      const maxOk = filters.maxPrice === undefined || price <= filters.maxPrice;
      return minOk && maxOk;
    });
  }

  // Filter by duration
  if (filters.duration && filters.duration !== 'any') {
    results = results.filter(tour => {
      const hours = parseDuration(tour.duration);
      const category = getDurationCategory(hours);
      return category === filters.duration;
    });
  }

  // Filter by rating
  if (filters.minRating) {
    results = results.filter(tour => {
      const rating = parseFloat(tour.rating);
      return rating >= filters.minRating;
    });
  }

  // Sorting
  switch (sortBy) {
    case 'priceLow':
      results.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
      break;
    case 'priceHigh':
      results.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
      break;
    case 'rating':
      results.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
      break;
    case 'newest':
      results.sort((a, b) => b.id - a.id);
      break;
    case 'recommended':
    default:
      // Keep original order for recommended
      break;
  }

  return results;
};

/**
 * Get all available services
 * @returns {Array} - All services
 */
export const getServices = () => {
  return services;
};

/**
 * Get service by slug
 * @param {string} slug - Service slug like "bike-rickshaw"
 * @returns {Object|null} - Service object or null
 */
export const getServiceBySlug = (slug) => {
  const serviceMap = {
    'bike-rickshaw': 0,
    'guided-tours': 1,
    'bike-tour': 0,
    'tuscan-hills': 2,
    'transportation': 3,
    'wine-tours': 5,
    'coach-trips': 3,
    'luxury-cars': 4,
  };
  
  const index = serviceMap[slug];
  return index !== undefined ? services[index] : null;
};

/**
 * Get tours by service type
 * @param {string} serviceType - Service type slug
 * @param {Function} t - Translation function
 * @returns {Array} - Related tours
 */
export const getToursByService = (serviceType, t) => {
  const serviceKeywords = {
    'bike-rickshaw': ['bike', 'lucca'],
    'guided-tours': ['tour', 'guided'],
    'bike-tour': ['bike', 'tour'],
    'tuscan-hills': ['hills', 'tuscan', 'lucca hills'],
    'transportation': ['coach', 'pisa', 'florence'],
    'wine-tours': ['wine', 'tasting', 'tuscany'],
    'coach-trips': ['coach', 'trip'],
    'luxury-cars': ['luxury', 'siena'],
  };

  const keywords = serviceKeywords[serviceType] || [];
  
  if (keywords.length === 0) return tours;

  return tours.filter(tour => {
    const title = t ? t(tour.titleKey).toLowerCase() : tour.titleKey.toLowerCase();
    return keywords.some(keyword => title.includes(keyword));
  });
};

/**
 * Get search suggestions based on query
 * @param {string} query - Search query
 * @param {Function} t - Translation function
 * @returns {Array} - Suggestions
 */
export const getSearchSuggestions = (query, t) => {
  if (!query || query.length < 2) return [];
  
  const queryLower = query.toLowerCase();
  const suggestions = [];
  
  tours.forEach(tour => {
    const title = t ? t(tour.titleKey) : tour.titleKey;
    if (title.toLowerCase().includes(queryLower)) {
      suggestions.push({
        type: 'tour',
        title,
        id: tour.id,
      });
    }
  });
  
  return suggestions.slice(0, 5);
};
