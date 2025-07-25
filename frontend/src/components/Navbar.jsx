import { Moon, Sun, Menu, Globe } from 'lucide-react';
import { useParams } from 'react-router';
import { useAppStore } from '../store/appStore';
import { useState, useEffect } from 'react';

const Navbar = () => {

  const isDark = useAppStore((s) => s.isDark);
  const setIsDark = useAppStore((s) => s.setIsDark);
  const isCollapsed = useAppStore((s) => s.isCollapsed);
  const setIsCollapsed = useAppStore((s) => s.setIsCollapsed);
  const notes = useAppStore((s) => s.notes);
  const selectedNotesId = useAppStore((s) => s.selectedNotesId);
  const publishNote = useAppStore((s) => s.publishNote);

  const [showPublish, setShowPublish] = useState(false);
  const { id } = useParams();

  const currNote = notes.find((note) => note._id === selectedNotesId) || {title: "Welcome to HuntPad", isPublished: false};
 
  const toggleTheme = () => {
  const isDarkNow = document.documentElement.classList.toggle("dark");
  localStorage.setItem("theme", isDarkNow ? "dark" : "light");
  setIsDark(isDarkNow);
  }

  useEffect(() => {
    if (id){
      setShowPublish(true);
    } else {
      setShowPublish(false);
    }
  },[id]);
 
  const handlePublish = async () => {
    if (!selectedNotesId) {
      console.log("No note selected for publishing");
      return;
    }
    await publishNote(selectedNotesId);
    console.log("Note published successfully");
  }

  return (
    <header className="h-11 mt-4 mr-2 text-slate-700 dark:text-stone-50 cursor-default">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between ml-3">
              <Menu onClick={setIsCollapsed} className={`${isCollapsed ? "" : "hidden"} hover:scale-110 cursor-pointer`} />
              <div className="font-semibold text-xl rounded-lg px-4 py-1 ml-2 truncate max-w-32 [@media(min-width:390px)]:max-w-48 sm:max-w-60 t">{currNote?.title}</div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <button onClick={handlePublish} className={`font-semibold text-sm flex justify-center items-center gap-2 bg-slate-200 dark:bg-slate-900 px-3 py-1 rounded-full ${showPublish ? "": "hidden"} hover:ring-1 hover:ring-slate-700 dark:hover:ring-slate-300 cursor-pointer t`}><Globe className={`${currNote?.isPublished ? "" : "hidden"} size-5 text-indigo-500`}/>Publish</button>
              <nav onClick={toggleTheme} className="relative mr-5 rounded-full w-14 h-7 bg-slate-300 dark:bg-slate-900 cursor-pointer t">
                {isDark ? <Moon className="absolute right-0.5 top-0.5 bg-slate-900 text-slate-200 rounded-full p-1 scale-100"/> : <Sun className="absolute left-0.5 top-0.5 bg-slate-200 text-slate-900 rounded-full p-1 scale-100" /> }
              </nav>
            </div>
          </div>
    </header>
  )
}

export default Navbar