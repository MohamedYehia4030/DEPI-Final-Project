import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Helper to check if a date is in the past (before today, not including today)
const isDatePast = (dateInput) => {
  if (!dateInput) return false;
  
  let tourDate;
  
  // Handle different date formats
  if (dateInput instanceof Date) {
    tourDate = new Date(dateInput);
  } else if (typeof dateInput === 'string') {
    tourDate = new Date(dateInput);
  } else {
    return false;
  }
  
  // Check if date is valid
  if (isNaN(tourDate.getTime())) return false;
  
  // Get today at midnight
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Get tour date at midnight for comparison
  tourDate.setHours(0, 0, 0, 0);
  
  // Only past if BEFORE today (today is still upcoming)
  return tourDate.getTime() < today.getTime();
};

const useUserTicketsStore = create(
  persist(
    (set, get) => ({
      tickets: [],

      // Add a new ticket after booking is complete
      addTicket: (ticketData) => {
        const { tickets } = get();
        
        // Prevent duplicate bookings with same reference number
        if (ticketData.refNumber && tickets.some(t => t.refNumber === ticketData.refNumber)) {
          console.log('Ticket with this reference already exists, skipping duplicate');
          return null;
        }
        
        const newTicket = {
          id: `TKT-${Date.now()}`,
          ...ticketData,
          bookedAt: new Date().toISOString(),
          status: 'upcoming',
        };
        set((state) => ({
          tickets: [newTicket, ...state.tickets],
        }));
        return newTicket;
      },

      // Get all tickets for a user (by email) - also updates past tickets to 'ended'
      getUserTickets: (userEmail) => {
        const { updatePastTickets } = get();
        updatePastTickets(); // Auto-update past tickets
        return get().tickets.filter((ticket) => ticket.userEmail === userEmail);
      },

      // Auto-update tickets with past dates to 'ended' status
      updatePastTickets: () => {
        set((state) => ({
          tickets: state.tickets.map((ticket) => {
            // Only update if currently 'upcoming' and date is truly in the past
            if (ticket.status === 'upcoming' && ticket.date && isDatePast(ticket.date)) {
              console.log('Marking ticket as ended:', ticket.refNumber, 'Date:', ticket.date);
              return { ...ticket, status: 'ended' };
            }
            return ticket;
          }),
        }));
      },

      // Update ticket status
      updateTicketStatus: (ticketId, status) => {
        set((state) => ({
          tickets: state.tickets.map((ticket) =>
            ticket.id === ticketId ? { ...ticket, status } : ticket
          ),
        }));
      },

      // Cancel a ticket
      cancelTicket: (ticketId) => {
        set((state) => ({
          tickets: state.tickets.map((ticket) =>
            ticket.id === ticketId ? { ...ticket, status: 'cancelled' } : ticket
          ),
        }));
      },

      // Clear all tickets (for testing)
      clearTickets: () => set({ tickets: [] }),
    }),
    {
      name: 'user-tickets-storage',
    }
  )
);

export default useUserTicketsStore;
