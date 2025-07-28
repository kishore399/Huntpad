import { Image } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import Navbar from "./Navbar";
import { useAppStore } from "../store/appStore";

const NoteCard = ({ children }) => {

  const { id } = useParams();
  const inputRef = useRef(null);
  const updateCoverPic = useAppStore((s) => s.updateCoverPic);
  const notes = useAppStore((s) => s.notes);

  const isTouchScreen = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;


  const [note, setNote] = useState(null);

  const handleClick = () => {
    inputRef.current.click();
  }

  useEffect(() => {
    const note = notes.find((n) => n._id === id);
    setNote(note)
  },[id, notes])

  const handleCoverChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size exceeds 2MB limit");
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = async () => {
        await updateCoverPic(id, reader.result);
      };
    }
  }

  return (
    <main className="flex-1 bg-stone-50 min-h-screen dark:bg-slate-800 dark:text-slate-100 box-border overflow-auto w-screen t">
      <Navbar />
      <div className="group relative h-44 md:h-52 md:mb-3 lg:h-60 lg:mb-5 bg-cover bg-center bg-no-repeat rounded-lg" style={{backgroundImage: `url(${note?.cover || "/BackgroundVioletScenery.jpg"})`}}>
      { id &&
        <button 
          onClick={handleClick} 
          className={`absolute bottom-4 right-10 py-0.5 px-2 backdrop-blur-sm flex ${isTouchScreen ? "" : "opacity-0 group-hover:opacity-100"} rounded-lg hover:scale-105 t bg-slate-300/70 dark:bg-slate-800/70 text-slate-800/80 dark:text-slate-300/80 justify-center items-center gap-1`}
        >
          <Image className="size-5"/>
          <p className="text-sm font-semibold">Change cover</p>
        </button>
      }
        <input type="file" accept="image/*" ref={inputRef} onChange={(e) => handleCoverChange(e)} className="hidden" />
      </div>
      {children}
    </main>
  )
}

export default NoteCard