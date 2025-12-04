/**
 * Image utility functions for handling broken images and placeholders
 */

export const PLACEHOLDER_IMAGE = 'https://placehold.co/600x400/e2e8f0/64748b?text=Image+Not+Available';

export const PLACEHOLDER_AVATAR = 'https://placehold.co/150x150/e2e8f0/64748b?text=User';
export const PLACEHOLDER_PACKAGE = 'https://placehold.co/400x300/e2e8f0/64748b?text=Package';
export const PLACEHOLDER_SERVICE = 'https://placehold.co/600x400/e2e8f0/64748b?text=Service';

/**
 * Get a valid image URL or return placeholder
 * @param {string} imgPath - The image path from database
 * @param {string} type - Type of placeholder ('package', 'service', 'avatar', 'default')
 * @returns {string} Valid image URL or placeholder
 */
export const getImageUrl = (imgPath, type = 'default') => {
  if (imgPath?.startsWith('https://res.cloudinary.com')) {
    return imgPath;
  }
  
  if (imgPath?.startsWith('http://') || imgPath?.startsWith('https://')) {
    return imgPath;
  }
  
  if (!imgPath || imgPath.startsWith('/images/') || imgPath.startsWith('/Media/')) {
    switch (type) {
      case 'avatar':
        return PLACEHOLDER_AVATAR;
      case 'package':
        return PLACEHOLDER_PACKAGE;
      case 'service':
        return PLACEHOLDER_SERVICE;
      default:
        return PLACEHOLDER_IMAGE;
    }
  }
  
  return imgPath;
};

/**
 * Handle image error by setting placeholder
 * @param {Event} e - Image error event
 * @param {string} type - Type of placeholder to use
 */
export const handleImageError = (e, type = 'default') => {
  e.target.onerror = null;
  
  switch (type) {
    case 'avatar':
      e.target.src = PLACEHOLDER_AVATAR;
      break;
    case 'package':
      e.target.src = PLACEHOLDER_PACKAGE;
      break;
    case 'service':
      e.target.src = PLACEHOLDER_SERVICE;
      break;
    default:
      e.target.src = PLACEHOLDER_IMAGE;
  }
};
