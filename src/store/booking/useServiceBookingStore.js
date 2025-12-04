import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialState = {
  currentStep: 1,
  serviceInfo: null,
  serviceType: null,
  quantity: 1,
  duration: '1 hour',
  selectedDate: null,
  selectedTime: null,
  customer: {
    name: '',
    email: '',
    phone: ''
  },
  paymentInfo: {
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  },
  appliedDiscount: null,
  bookingComplete: false,
  refNumber: null
};

const servicePricing = {
  'bike-rickshaw': {
    base: 15,
    perHour: 10,
    types: {
      city: 15,
      mountain: 20,
      electric: 25,
      road: 18
    }
  },
  'guided-tours': {
    base: 30,
    perHour: 20,
    types: {
      walking: 25,
      bike: 35,
      bus: 45,
      private: 80
    }
  },
  'tuscan-hills': {
    base: 50,
    perHour: 15,
    types: {
      standard: 50,
      premium: 75,
      private: 120
    }
  },
  'transportation': {
    base: 40,
    perHour: 25,
    types: {
      shuttle: 25,
      minibus: 45,
      coach: 60
    }
  },
  'luxury-cars': {
    base: 100,
    perHour: 50,
    types: {
      sedan: 80,
      suv: 120,
      limousine: 200
    }
  },
  'wine-tours': {
    base: 65,
    perHour: 0,
    types: {
      half_day: 65,
      full_day: 110,
      premium: 150
    }
  }
};

const durationOptions = [
  { value: '1 hour', hours: 1 },
  { value: '2 hours', hours: 2 },
  { value: '3 hours', hours: 3 },
  { value: 'Half day', hours: 4 },
  { value: 'Full day', hours: 8 }
];

const useServiceBookingStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      setService: (service) => set({
        serviceInfo: {
          slug: service.slug,
          titleKey: service.titleKey,
          descKey: service.descKey,
          img: service.img
        }
      }),

      setServiceType: (type) => set({ serviceType: type }),

      setQuantity: (quantity) => set({ quantity: Math.max(1, quantity) }),

      setDuration: (duration) => set({ duration }),

      setDateTime: (date, time) => set({ 
        selectedDate: date, 
        selectedTime: time 
      }),

      setCustomer: (customer) => set({ customer }),

      setPaymentInfo: (paymentInfo) => set({ paymentInfo }),

      setAppliedDiscount: (discount) => set({ appliedDiscount: discount }),

      nextStep: () => set((state) => ({ 
        currentStep: Math.min(state.currentStep + 1, 4) 
      })),
      
      prevStep: () => set((state) => ({ 
        currentStep: Math.max(state.currentStep - 1, 1) 
      })),
      
      goToStep: (step) => set({ currentStep: step }),

      calculateSubtotal: () => {
        const { serviceInfo, serviceType, quantity, duration } = get();
        if (!serviceInfo) return 0;

        const pricing = servicePricing[serviceInfo.slug] || { base: 25, perHour: 10 };
        const durationInfo = durationOptions.find(d => d.value === duration) || { hours: 1 };
        
        let typePrice = pricing.base;
        if (serviceType && pricing.types && pricing.types[serviceType]) {
          typePrice = pricing.types[serviceType];
        }

        const additionalHours = Math.max(0, durationInfo.hours - 1);
        const pricePerUnit = typePrice + (pricing.perHour * additionalHours);
        
        return pricePerUnit * quantity;
      },

      calculateTotal: () => {
        const { appliedDiscount } = get();
        const subtotal = get().calculateSubtotal();
        
        if (!appliedDiscount) return subtotal;
        
        const discountAmount = (subtotal * appliedDiscount.percentage) / 100;
        return Math.max(0, subtotal - discountAmount);
      },

      getDiscountAmount: () => {
        const { appliedDiscount } = get();
        const subtotal = get().calculateSubtotal();
        
        if (!appliedDiscount) return 0;
        
        return (subtotal * appliedDiscount.percentage) / 100;
      },

      completeBooking: () => {
        const refNumber = `SV-${Date.now()}`;
        set({ 
          bookingComplete: true, 
          refNumber,
          currentStep: 4
        });
        return refNumber;
      },

      resetBooking: () => set(initialState),

      canProceedFromStep: (step) => {
        const state = get();
        switch (step) {
          case 1:
            return state.serviceInfo && 
                   state.serviceType &&
                   state.selectedDate && 
                   state.selectedTime;
          case 2:
            return state.customer.name.trim() && 
                   state.customer.email.trim() &&
                   state.customer.phone.trim();
          case 3:
            return state.paymentInfo.cardNumber.trim() &&
                   state.paymentInfo.cardHolder.trim() &&
                   state.paymentInfo.expiryDate.trim() &&
                   state.paymentInfo.cvv.trim();
          default:
            return true;
        }
      },

      prefillFromForm: (formData) => set((state) => ({
        customer: {
          name: formData.name || state.customer.name,
          email: formData.email || state.customer.email,
          phone: formData.phone || state.customer.phone
        },
        serviceType: formData.serviceType || state.serviceType,
        selectedDate: formData.date || state.selectedDate,
        selectedTime: formData.time || state.selectedTime
      }))
    }),
    {
      name: 'service-booking-storage',
      partialize: (state) => ({
        serviceInfo: state.serviceInfo,
        serviceType: state.serviceType,
        quantity: state.quantity,
        duration: state.duration,
        selectedDate: state.selectedDate,
        selectedTime: state.selectedTime,
        customer: state.customer,
        appliedDiscount: state.appliedDiscount
      })
    }
  )
);

export default useServiceBookingStore;
