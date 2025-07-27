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
            console.log("No note ID provided for updateContent");
            return;
        }
        console.log("Updating content for note ID:", noteId);
        try {
            const res = await axios.put(`${Notes_URL}/${noteId}`, { content });
            console.log("updated data",res.data);     
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

    getNotes : async () => {
        set({ isGettingNotes: true })
        console.log("fetching notes")
        try {
            const res = await axios.get(Notes_URL);
            set({ isGettingNotes: false, notes: res.data });  
            console.log(res.data,"at last");     
        } catch (err) {
            console.log(err.response?.data?.message || "error")
            set({ error: err.response?.data?.message || "Error fetching Notes metadata", isGettingNotes: false });
        }
    },

    getContent : async (id) => {
        set({ isLoading: true })
        try {
            const res = await axios.get(`${Notes_URL}/${id}`);
            console.log("Content fetched successfully:", res.data?.content);
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
            console.log("Note published successfully:", res.data);
        } catch (err) {
            set({ error: err.response?.data?.message || "Error publishing note", isLoading: false });
        }
    },

    getPreview: async (id) => {
        set({ isLoading: true })
        try {
            const res = await axios.get(`${Notes_URL}/preview/${id}`);
            set({ isLoading: false, preview: res.data });
            console.log("Preview fetched successfully:", res.data);
        } catch (err) {
            set({ error: err.response?.data?.message || "Error fetching preview", isLoading: false });
        }
    },

    updateCoverPic : async (id, coverPic) => {
        set({ isLoading: true, error: null });
        try {
            console.log("Updating cover picture:", coverPic);
            set((s) => ({ 
                notes: s.notes.map((note) => 
                    note._id === id ? { ...note, cover: coverPic } : note
                ),
                isLoading: false
            }));
            const res = await axios.put(`${Notes_URL}/cover/${id}`,{ coverPic });
            set({ isLoading: false });
            console.log("Cover picture updated successfully:");
        } catch(err) {
            set({ error: err.response?.data?.message || "Error updating Profil Picture", isLoading: false })
        }
    },
}))