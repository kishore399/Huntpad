import { create } from "zustand";
import axios from "axios";
import { deleteNote, pinNote } from "../../../backend/controllers/notes.controller";

const Notes_URL = "http://localhost:5000/api/notes";
axios.defaults.withCredentials = true;

export const useAppStore = create((set,get) => ({
    isDark: false,
    setIsDark: (theme) => set({isDark: theme}),
    isCollapsed: false,
    setIsCollapsed: () => set((s) => ({isCollapsed : !s.isCollapsed})),
    isLoading: false,
    error: null,
    notes: [],
    selectedNotesId: null,
    selectedContent: [],
    defaultEmptyNote: {
        title: "Untitled",
        content: "type '/' for commands"
    },

    updateContent: async (newContent) => {
        set({ selectedContent: newContent })
        try {
            const res = await axios.put(`${Notes_URL}/${id}`, content);
            console.log(res.data);     
        } catch (err) {
            set({ error: err.response?.data?.message || "Error updating notes", isLoading: false });           
        }
    },

    updateTitle: (newTitle) => {
        set((s) => ({notes: s.notes.map((note) => (
            (note._id === s.selectedNotesId) ? {...note , title: newTitle} : note
        ))}))
        console.log("Title updated to: ", newTitle);
    },

    saveTitle: async (id, title) => {
        set({ isLoading: true })
        try {
            const res = await axios.put(`${Notes_URL}/title/${id}`, { title });
            set({ isLoading: false });
            console.log("Title saved successfully:", res.data);
        } catch (err) {
            set({ error: err.response?.data?.message || "Error saving title", isLoading: false });
        }
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
        console.log("fetching notes")
        try {
            const res = await axios.get(Notes_URL);
            set({ isLoading: false, notes: res.data });  
            console.log(res.data,"at last");     
        } catch (err) {
            console.log(err.response?.data?.message || "error")
            set({ error: err.response?.data?.message || "Error fetching Notes metadata", isLoading: false });
        }
    },

    getContent : async (id) => {
        set({ selectedNotesId: id, isLoading: true })
        try {
            const res = await axios.get(Notes_URL);
            set((s) => ({ isLoading: false, selectedContent: res.data?.content || s.selectedContent }));  
            console.log(res.data);     
        } catch (err) {
            set({ error: err.response?.data?.message || "Error fetching Note's content", isLoading: false });
        }
    },

    createNote : async () => {
        try {
            const { notes, defaultEmptyNote } = get();
            const res = await axios.post(Notes_URL, defaultEmptyNote);
            set({ notes : [...notes, res.data] });
            console.log(res.data);     
        } catch (err) {
            set({ error: err.response?.data?.message || "Error creating notes", isLoading: false });
        }
    },

    deleteNote: async (id) => {
        set({ isLoading: true })
        try {
            const res = await axios.delete(`${Notes_URL}/${id}`);
            set((s) => ({ notes: s.notes.filter((note) => note._id !== id), isLoading: false }));
            console.log("deleted", res.data);
        } catch (err) {
            set({ error: err.response?.data?.message || "Error deleting note", isLoading: false });
        }
    },

    pinNote: async (id) => {
        set({ isLoading: true })
        try {
            const res = await axios.put(`${Notes_URL}/pin/${id}`);
            set({ isLoading: false, notes: res.data });
            console.log("Pin",res.data);
        } catch (err) {
            set({ error: err.response?.data?.message || "Error pinning note", isLoading: false });
        }
    },
}))