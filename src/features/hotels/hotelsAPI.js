// Hotels placeholder API client
export const createHotelsClient = () => ({
  async list(params = {}) {
    // TODO: replace with real API call
    console.log('Hotels::list', params);
    return [];
  },
  async getById(id) {
    // TODO: replace with real API call
    console.log('Hotels::getById', id);
    return { id };
  },
  async create(payload) {
    // TODO: replace with real API call
    console.log('Hotels::create', payload);
    return { ...payload };
  },
});
