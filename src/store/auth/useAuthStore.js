import { create } from "zustand";
import axios from "axios";
import useAppStore from "./useAppStore"; // Import the App store to close the modal

// Base URL for your authentication routes
const API_URL = "/api/auth";

// Helper function to load user data from local storage
const getUserFromStorage = () => {
  try {
    const user = localStorage.getItem("user");
    // Parse the JSON string from localStorage. If it exists, it contains the token and user data.
    return user ? JSON.parse(user) : null;
  } catch (e) {
    console.error("Could not parse user from localStorage", e);
    return null;
  }
};

// ----------------------------------------------------
// The Authentication Store
// ----------------------------------------------------
export const useAuthStore = create((set, get) => ({
  // STATE: Initialize user from local storage for persistence
  user: getUserFromStorage(),
  isLoading: false,
  error: null,

  // ACTIONS
  // ----------------------------------------------------

  /**
   * Handles the user login process: API call, state update, and persistence.
   */
  login: async (email, password) => {
    set({ isLoading: true, error: null }); // Start loading and clear old errors

    try {
      // 1. API call to your backend /api/auth/login endpoint
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      const userData = response.data;

      // 2. Persistence: Save the user data (which includes the token) to local storage
      localStorage.setItem("user", JSON.stringify(userData));

      // 3. State Update: Update the Zustand state
      set({
        user: userData,
        isLoading: false,
      });

      // 4. Component Interaction: Close the auth modal
      useAppStore.getState().closeAuthModal();
    } catch (error) {
      // 5. Error Handling: Extract the error message from the backend response
      const message =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "An unknown login error occurred";

      // Stop loading, set the error in state
      set({ isLoading: false, error: message });

      // Re-throw the error so the component (LoginForm.jsx) can catch it
      // and display it as 'localError'.
      throw new Error(message);
    }
  },

  /**
   * Clears user data from state and local storage.
   */
  logout: () => {
    localStorage.removeItem("user");
    set({ user: null, isLoading: false, error: null });
  },

  // Placeholder for the next step: Register action
  register: async (name, email, password) => {
    set({ isLoading: true, error: null });
    try {
      // call backend register endpoint
      const response = await axios.post(`${API_URL}/register`, {
        name,
        email,
        password,
      });
      const userData = response.data;

      // persist and update state
      localStorage.setItem("user", JSON.stringify(userData));
      set({ user: userData, isLoading: false });

      // close modal via app store
      useAppStore.getState().closeAuthModal();
      return userData;
    } catch (error) {
      const message =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "An unknown registration error occurred";
      set({ isLoading: false, error: message });
      throw new Error(message);
    }
  },
  setGoogleAuth: (userData) => {
    // Persist and update state
    localStorage.setItem("user", JSON.stringify(userData));
    set({ user: userData, isLoading: false, error: null });
    // The component handles closing the modal and navigation.
  },

  /**
   * Updates user profile (name, avatar) - persists to database
   */
  updateUser: async (updates) => {
    const currentUser = get().user;
    if (!currentUser) return;

    set({ isLoading: true, error: null });

    try {
      // Call API to update profile on server
      const response = await axios.put(`${API_URL}/profile`, updates, {
        headers: { Authorization: `Bearer ${currentUser.token}` }
      });

      const updatedUser = {
        ...currentUser,
        ...response.data,
        token: currentUser.token, // Preserve the token
      };

      // Update localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Update state
      set({ user: updatedUser, isLoading: false });

      return updatedUser;
    } catch (error) {
      const message =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Failed to update profile";
      
      set({ isLoading: false, error: message });
      throw new Error(message);
    }
  },
}));
