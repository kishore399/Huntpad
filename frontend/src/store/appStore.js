import { create } from "zustand";
import axios from "axios";

const Notes_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api/notes" : "/api/notes";
axios.defaults.withCredentials = true;

export const useAppStore = create((set,get) => ({
    isDark: true,
    setIsDark: (theme) => set({isDark: theme}),
    isCollapsed: true,
    setIsCollapsed: () => set((s) => {
        console.log("sidebar changed")
        return {isCollapsed : !s.isCollapsed}
    }),
    isLoading: false,
    isGettingNotes: true,
    error: null,
    notes: [],
    selectedNotesId: null,
    selectedContent: [],
    defaultEmptyNote: {
        title: "Untitled",
        content: [{ id: "init-block", type: "paragraph", content: [{ type: "text", text: "" }] }],
    },
    preview: null,

    setSelectedNotesId: (id) => {
        set({ selectedNotesId: id })
    },

    updateContent: async (content) => {
        set({ selectedContent: content });
        const noteId = get().selectedNotesId;
        if (!noteId) {
            return;
        }
        try {
            const res = await axios.put(`${Notes_URL}/${noteId}`, { content });
        } catch (err) {
            set({ error: err.response?.data?.message || "Error updating notes", isLoading: false });           
        }
    },

    updateTitle: (newTitle) => {
        set((s) => ({notes: s.notes.map((note) => (
            (note._id === s.selectedNotesId) ? {...note , title: newTitle} : note
        ))}))
    },

    saveTitle: async (id, title) => {
        set({ isLoading: true })
        try {
            const res = await axios.put(`${Notes_URL}/title/${id}`, { title });
            set({ isLoading: false });
        } catch (err) {
            set({ error: err.response?.data?.message || "Error saving title", isLoading: false });
        }
    },

    getNotes : async () => {
        set({ isGettingNotes: true })
        try {
            const res = await axios.get(Notes_URL);
            set({ isGettingNotes: false, notes: res.data });     
        } catch (err) {
            set({ error: err.response?.data?.message || "Error fetching Notes metadata", isGettingNotes: false });
        }
    },

    getContent : async (id) => {
        set({ isLoading: true })
        try {
            const res = await axios.get(`${Notes_URL}/${id}`);
            set((s) => ({ isLoading: false, selectedContent: res.data?.content || s.selectedContent }));      
        } catch (err) {
            set({ error: err.response?.data?.message || "Error fetching Note's content", isLoading: false });
        }
    },

    createNote : async (Navigate) => {
        try {
            const { notes, defaultEmptyNote } = get();
            const res = await axios.post(Notes_URL, defaultEmptyNote);
            set({ notes : [...notes, res.data], selectedNotesId: res.data._id, selectedContent: res.data.content });
            Navigate?.(res.data._id);    
        } catch (err) {
            set({ error: err.response?.data?.message || "Error creating notes", isLoading: false });
        }
    },

    deleteNote: async (id) => {
        set({ isLoading: true })
        try {
            const res = await axios.delete(`${Notes_URL}/${id}`);
            set((s) => ({ notes: s.notes.filter((note) => note._id !== id), isLoading: false }));
        } catch (err) {
            set({ error: err.response?.data?.message || "Error deleting note", isLoading: false });
        }
    },

    pinNote: async (id) => {
        set({ isLoading: true })
        try {
            const res = await axios.put(`${Notes_URL}/pin/${id}`);
            set({ isLoading: false, notes: res.data });
        } catch (err) {
            set({ error: err.response?.data?.message || "Error pinning note", isLoading: false });
        }
    },

    publishNote: async (id) => {
        set({ isLoading: true })
        try {
            const res = await axios.put(`${Notes_URL}/publish/${id}`);
            set((s) => ({ 
                notes: s.notes.map((note) => 
                    note._id === id ? { ...note, isPublished: !note.isPublished } : note
                ),
                isLoading: false
            }));
        } catch (err) {
            set({ error: err.response?.data?.message || "Error publishing note", isLoading: false });
        }
    },

    getPreview: async (id) => {
        set({ isLoading: true })
        try {
            const res = await axios.get(`${Notes_URL}/preview/${id}`);
            set({ isLoading: false, preview: res.data });
        } catch (err) {
            set({ error: err.response?.data?.message || "Error fetching preview", isLoading: false });
        }
    },

    updateCoverPic : async (id, coverPic) => {
        set({ isLoading: true, error: null });
        try {
            set((s) => ({ 
                notes: s.notes.map((note) => 
                    note._id === id ? { ...note, cover: coverPic } : note
                ),
                isLoading: false
            }));
            const res = await axios.put(`${Notes_URL}/cover/${id}`,{ coverPic });
            set({ isLoading: false });
        } catch(err) {
            set({ error: err.response?.data?.message || "Error updating Profil Picture", isLoading: false })
        }
    },
}))