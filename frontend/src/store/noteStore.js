import { create } from "zustand";
import axios from "axios";

export const useNoteStore = create((set,get) => ({
    isDark: false,
    setIsDark: (theme) => set({isDark: theme})
}))