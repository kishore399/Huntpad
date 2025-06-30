import { Moon, Sun, Clipboard , Menu} from "lucide-react";
import { useState } from "react";
import Navbar from "./Navbar";
import Editor from "./Editor";

const NoteCard = () => {

  return (
    <main className="flex-1 bg-stone-50 min-h-screen dark:bg-slate-800 dark:text-slate-100 transition-all duration-300 ease-in-out">
      <Navbar />
      <div className="h-36 bg-[url('/BackgroundVioletScenery.jpg')] bg-cover bg-center rounded-lg" />
      <Editor />
    </main>
  )
}

export default NoteCard