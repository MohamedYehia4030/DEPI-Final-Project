// Mock review entries that reference i18n keys in the `Reviews` namespace.
// Each item points to the translation keys in public/locales/*/Reviews.json
const mockReviews = [
  { nameKey: 'comments.0.name', commentKey: 'comments.0.comment' },
  { nameKey: 'comments.1.name', commentKey: 'comments.1.comment' },
  { nameKey: 'comments.2.name', commentKey: 'comments.2.comment' },
  { nameKey: 'comments.3.name', commentKey: 'comments.3.comment' },
  { nameKey: 'comments.4.name', commentKey: 'comments.4.comment' },
];

export default mockReviews;
