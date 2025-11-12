// Flights placeholder API client
export const createFlightsClient = () => ({
  async list(params = {}) {
    // TODO: replace with real API call
    console.log('Flights::list', params);
    return [];
  },
  async getById(id) {
    // TODO: replace with real API call
    console.log('Flights::getById', id);
    return { id };
  },
  async create(payload) {
    // TODO: replace with real API call
    console.log('Flights::create', payload);
    return { ...payload };
  },
});
