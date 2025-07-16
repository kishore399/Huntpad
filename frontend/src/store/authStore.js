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
    isCheckingAuth: true,

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

    verifyEmail : async (code, from) => {
        set({ isLoading: true, error: null });
        try{
            const email = get().user?.email
            const res = await axios.post(`${Auth_URL}/verifyEmail`, {code, email, from});
            set({user: res.data.userInfo, isVerified: true, isLoading: false});
            console.log(get().user)
        } catch (err) {
            set({ error: err.response?.data?.message || "Error verifying OTP", isLoading: false })
            throw err;
        }
    },

    login : async (email, password) => {
        set({error: null, isLoading: true});
        try {
            const res = await axios.post(`${Auth_URL}/login`,{ email, password });
            set({user : res.data.userInfo, isAuthenticated: true, isLoading: false})
        } catch(err) {
            set({ error: err.response?.data?.message || "Error Logging in", isLoading: false })
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
    },

    forgotPassword: async (email) => {
        set({ isLoading: true, error: null });
        try {
            const res = await axios.post(`${Auth_URL}/forgotPassword`,{ email });
            set({ user : res.data.userInfo, isLoading: false });
            console.log(res.data)
            console.log(get().user)
        } catch (err) {
            set({ error: err.response?.data?.message || "Error reseting password", isLoading: false })
            throw err;
        }
    },

    resetPassword : async (password) => {
        set({ isLoading: true, error: null });
        try{
            const email = get().user?.email
            console.log(password)
            const res = await axios.post(`${Auth_URL}/resetPassword`, {password, email});
            set({user: res.data.userInfo, isLoading: false});
            console.log(get().user)
        } catch (err) {
            set({ error: err.response?.data?.message || "Error verifying OTP", isLoading: false })
            throw err;
        }
    },

    updateProfilePic : async (profilePic) => {
        set({ isLoading: true, error: null });
        try {
            const res = await axios.put("http://localhost:5000/api/auth/profilePic",{ profilePic });
            set({user: res.data.userInfo, isLoading: false});
        } catch(err) {
            set({ error: err.response?.data?.message || "Error updating Profil Picture", isLoading: false })
        }
    },

    logout : async () => {
        set({ isLoading: true, error: null });
        try {
            await axios.post(`${Auth_URL}/logout`);
            set({ user: null, isAuthenticated: false, isLoading: false });
        } catch (err) {
            set({ error: err.response?.data?.message || "Error logging out", isLoading: false });
        }
    },

}))
