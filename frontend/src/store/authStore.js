import { create } from "zustand";
import axios from "axios";

const Auth_URL = "http://localhost:5000/api/auth";
axios.defaults.withCredentials = true;

export const useAuthStore = create((set, get) => ({
    user: null,
    error: null,
    isLoading: false,
    isVerified: false,

    setError: (msg) => set({error: msg}),

    signup: async ( email, password, fullName ) => {
        set({ isLoading: true, error: null })
        try {
            const res = await axios.post(`${Auth_URL}/signup`,{ email, password, fullName });
            set({user : res.data.userInfo, isVerified: true, isLoading: false})
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
    }
}))
