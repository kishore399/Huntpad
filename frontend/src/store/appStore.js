import { create } from "zustand";
import axios from "axios";

const Notes_URL = "http://localhost:5000/api/notes";
axios.defaults.withCredentials = true;

export const useAppStore = create((set,get) => ({
    isDark: false,
    setIsDark: (theme) => set({isDark: theme}),
    isCollapsed: false,
    setIsCollapsed: () => set((s) => ({isCollapsed : !s.isCollapsed})),
    isLoading: false,
    error: null,
    notes: [ {title: "Untitled", content: "type '/' for commands"}, {title: "Welcome", content: "type '/' for commands"} ],
    defaultEmptyNote: {
        title: "Untitled",
        content: "type '/' for commands"
    },

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
            const res = await axios.get(Notes_URL);
            set({ isLoading: false, notes: res.data });  
            console.log(res.data);     
        } catch (err) {
            set({ error: err.response?.data?.message || "Error fetching Notes metadata", isLoading: false });
        }
    },

    createNote : async () => {
        try {
            const { notes, defaultEmptyNote } = get();
            const res = await axios.post(Notes_URL, defaultEmptyNote);
            set({ notes : [...notes, defaultEmptyNote] });
            console.log(res.data);     
        } catch (err) {
            set({ error: err.response?.data?.message || "Error fetching Notes metadata", isLoading: false });
        }
    }
}))