import { create } from "zustand";
import axios from "axios";

export const useAppStore = create((set,get) => ({
    isDark: false,
    setIsDark: (theme) => set({isDark: theme}),
    isCollapsed: false,
    setIsCollapsed: () => set((s) => ({isCollapsed : !s.isCollapsed})),
    isLoading: false,
    error: null,
    notes: null,

    updateProfilePic : async (profilePic) => {
        set({ isLoading: true })
        try {
            const res = await axios.put("http://localhost:5000/api/auth/profilePic",{ profilePic });
            set({ isLoading: false})
        } catch(err) {
            set({ error: err.response?.data?.message || "Error updating the Picture", isLoading: false });
        }
    },

    getNotes : async () => {
        set({ isLoading: true })
        try {
            const res = await axios.get("http://localhost:5000/api/notes");
            set({ isLoading: false, notes: res.data });  
            console.log(res.data);     
        } catch (err) {
            set({ error: err.response?.data?.message || "Error fetching Notes metadata", isLoading: false });
        }
    }
}))