import { create } from "zustand";
import axios from "axios";

const Auth_URL = "http://localhost:5000/api/auth";
axios.defaults.withCredentials = true;

export const useAuthStore = create((set, get) => ({
    user: null,
    error: null,
    isLoading: false,
    isAuthenticated: false,
    isVerified: false,
    isCheckingAuth: false,

    setError: (msg) => set({error: msg}),

    signup: async ( email, password, fullName ) => {
        set({ isLoading: true, error: null })
        try {
            const res = await axios.post(`${Auth_URL}/signup`,{ email, password, fullName });
            set({user : res.data.userInfo, isAuthenticated: true, isLoading: false})
        } catch(err) {
            set({ error: err.response?.data?.message || "Error signing up", isLoading: false })
            throw err;
        }
    },

    verifyEmail : async (code) => {
        set({ isLoading: true, error: null });
        try{
            const email = get().user?.email
            const res = await axios.post(`${Auth_URL}/verifyEmail`, {code, email});
            set({user: res.data.userInfo, isVerified: true, isLoading: false});
        } catch (err) {
            set({ error: err.response?.data?.message || "Error signing up", isLoading: false })
            throw err;
        }
    },

    login : async (email, password) => {
        set({error: null, isLoading: true});
        try {
            const res = await axios.post(`${Auth_URL}/login`,{ email, password });
            set({user : res.data.userInfo, isAuthenticated: true, isLoading: false})
        } catch(err) {
            set({ error: err.response?.data?.message || "Error signing up", isLoading: false })
            throw err;
        }
    },

    checkAuth : async () => {
        set({error: null, isCheckingAuth: true});
        try {
            const res = await axios.get(`${Auth_URL}/validate`);
            set({ user: res.data.userInfo, isAuthenticated: true, isCheckingAuth: false});
        } catch (err) {
            console.log(err);
            set({ error: null, isCheckingAuth: false});
        }
    }
}))
