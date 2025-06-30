import { create } from "zustand";
import axios from "axios";

export const useAppStore = create((set,get) => ({
    isDark: false,
    setIsDark: (theme) => set({isDark: theme}),
    isCollapsed: false,
    setIsCollapsed: () => set((s) => ({isCollapsed : !s.isCollapsed})),
    isLoading: false,
    error: null,

    updateProfilePic : async (profilePic) => {
        set({ isLoading: true })
        try {
            const res = await axios.put("http://localhost:5000/api/auth/profilePic",{ profilePic });
            set({ isLoading: false})
        } catch(err) {
            set({ error: err.response?.data?.message || "Error updating Profil Picture", isLoading: false })
        }
    },
}))