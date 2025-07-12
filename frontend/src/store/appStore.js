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
    notes: [ {title: "Xmen in the forest fishing fishes to eat", content: "type '/' for commands"}, {title: "Welcome", content: "type '/' for commands"} ],
    selectedNotesId: null,
    selectedContent: [],
    defaultEmptyNote: {
        title: "Untitled",
        content: "type '/' for commands"
    },

    updateContent: (newContent) => {
        set({ selectedContent: newContent })
    },

    updateTitle: (newTitle) => {
        set((s) => ({notes: s.notes.map((note) => (
            (note._id === s.selectedNotesId) ? {...note , title: newTitle} : note
        ))}))
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
            const currentNotes = get().notes;
            set({ isLoading: false, notes: [...currentNotes, ...res.data] });  
            console.log(res.data,"at last");     
        } catch (err) {
            console.log(err.response?.data?.message || "error")
            set({ error: err.response?.data?.message || "Error fetching Notes metadata", isLoading: false });
        }
    },

    getContent : async (id) => {
        set({ selectedNotesId: id })
        // set({ isLoading: true })
        // try {
            // const res = await axios.get(Notes_URL);
            // set({ isLoading: false, selectedContent: res.data });  
            // console.log(res.data);     
        // } catch (err) {
            // set({ error: err.response?.data?.message || "Error fetching Note's content", isLoading: false });
        // }
    },

    createNote : async () => {
        try {
            const { notes, defaultEmptyNote } = get();
            const res = await axios.post(Notes_URL, defaultEmptyNote);
            set({ notes : [...notes, defaultEmptyNote] });
            console.log(res.data);     
        } catch (err) {
            set({ error: err.response?.data?.message || "Error creating notes", isLoading: false });
        }
    },

    updateNote : async (id, notes) => {
        try {
            const res = await axios.put(`${Notes_URL}/${id}`, notes);
            console.log(res.data);     
        } catch (err) {
            set({ error: err.response?.data?.message || "Error updating notes", isLoading: false });           
        }
    },
}))