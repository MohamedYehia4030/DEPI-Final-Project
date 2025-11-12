// Reviews placeholder API client
export const createReviewsClient = () => ({
  async list(params = {}) {
    // TODO: replace with real API call
    console.log('Reviews::list', params);
    return [];
  },
  async getById(id) {
    // TODO: replace with real API call
    console.log('Reviews::getById', id);
    return { id };
  },
  async create(payload) {
    // TODO: replace with real API call
    console.log('Reviews::create', payload);
    return { ...payload };
  },
});
