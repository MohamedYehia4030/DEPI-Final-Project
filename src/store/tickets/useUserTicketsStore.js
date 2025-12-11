import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const isDatePast = (dateInput) => {
  if (!dateInput) return false;
  
  let tourDate;
  
  if (dateInput instanceof Date) {
    tourDate = new Date(dateInput);
  } else if (typeof dateInput === 'string') {
    tourDate = new Date(dateInput);
  } else {
    return false;
  }
  
  if (isNaN(tourDate.getTime())) return false;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  tourDate.setHours(0, 0, 0, 0);
  
  return tourDate.getTime() < today.getTime();
};

const useUserTicketsStore = create(
  persist(
    (set, get) => ({
      tickets: [],

      addTicket: (ticketData) => {
        const { tickets } = get();
        
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

      getUserTickets: (userEmail) => {
        const { updatePastTickets } = get();
        updatePastTickets();
        return get().tickets.filter((ticket) => ticket.userEmail === userEmail);
      },

      updatePastTickets: () => {
        set((state) => ({
          tickets: state.tickets.map((ticket) => {
            if (ticket.status === 'upcoming' && ticket.date && isDatePast(ticket.date)) {
              console.log('Marking ticket as ended:', ticket.refNumber, 'Date:', ticket.date);
              return { ...ticket, status: 'ended' };
            }
            return ticket;
          }),
        }));
      },

      updateTicketStatus: (ticketId, status) => {
        set((state) => ({
          tickets: state.tickets.map((ticket) =>
            ticket.id === ticketId ? { ...ticket, status } : ticket
          ),
        }));
      },

      cancelTicket: (ticketId) => {
        set((state) => ({
          tickets: state.tickets.map((ticket) =>
            ticket.id === ticketId ? { ...ticket, status: 'cancelled' } : ticket
          ),
        }));
      },

      clearTickets: () => set({ tickets: [] }),
    }),
    {
      name: 'user-tickets-storage',
    }
  )
);

export default useUserTicketsStore;
