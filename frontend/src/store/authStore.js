import { create } from "zustand";
import axios from "axios";

const Auth_URL = "https://localhost:5000/api/auth"
export const useAuthStore = create((set) => ({
    user: null,
    error: null,
    isLoading: false,
    isVerified: false,

    signup: async( email, password, fullName ) => {
        set({ isLoading: true, error: null })
        try {
            const res = await axios.post(`${Auth_URL}/signup`,{ email, password, fullName });
            set({user : res.data.userInfo, isVerified: true, isLoading: false})

        } catch(err) {
            console.log(err)
        }
    }
}))
