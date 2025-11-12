// Packages placeholder API client
export const createPackagesClient = () => ({
  async list(params = {}) {
    // TODO: replace with real API call
    console.log('Packages::list', params);
    return [];
  },
  async getById(id) {
    // TODO: replace with real API call
    console.log('Packages::getById', id);
    return { id };
  },
  async create(payload) {
    // TODO: replace with real API call
    console.log('Packages::create', payload);
    return { ...payload };
  },
});
