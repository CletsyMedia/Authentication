import { create } from "zustand";
import axios from "axios";

const ApiUrl = import.meta.env.MODE === "development" ? "http://localhost:5000/api/auth/" : "/api/auth/";

// To accept request and bypass cors
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  

  signUp: async (name, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${ApiUrl}signup`, {
        name,
        email,
        password,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error signing up",
        isLoading: false,
      });
      throw error;
    }
  },

  verifyEmail: async (verifyCode) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${ApiUrl}verify-email`,{verifyCode});
      set({ 
        user: response.data.user, 
        isAuthenticated: true, 
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || "Error verifying email", 
        isLoading: false 
      });
      throw error;
    }
  },
  
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${ApiUrl}login`, { email, password });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error logging in",
        isLoading: false,
      });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${ApiUrl}logout`);
      set({ user: null, isAuthenticated: false, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || "Error logging out", isLoading: false });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true , error: null});
    try {
      const response = await axios.get(`${ApiUrl}check-auth`);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({ error: null || null, isCheckingAuth: false, isAuthenticated: false });
    }
  },

  passwordReset: async (email) => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${ApiUrl}forgot-password`, { email });
      set({ isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || "Error resetting password", isLoading: false });
      throw error;
    }
  },

  resetPassword: async ( password, token) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${ApiUrl}reset-password/${token}`, { password });
      set({ message: response.data?.message, isLoading: false });

    } catch (error) {
      set({ error: error.response?.data?.message || "Error resetting password", isLoading: false });
      throw error;
    }
  },

  updateProfile: async (name) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(`${ApiUrl}update-profile`, {
        name
      });
      set({ user: response.data.user, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || "Error updating profile", isLoading: false });
      throw error;
    }
  }
  
}));
