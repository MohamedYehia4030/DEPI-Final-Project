// Bookings placeholder API client
export const createBookingsClient = () => ({
  async list(params = {}) {
    // TODO: replace with real API call
    console.log('Bookings::list', params);
    return [];
  },
  async getById(id) {
    // TODO: replace with real API call
    console.log('Bookings::getById', id);
    return { id };
  },
  async create(payload) {
    // TODO: replace with real API call
    console.log('Bookings::create', payload);
    return { ...payload };
  },
});
