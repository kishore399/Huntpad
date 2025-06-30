import { Moon, Sun, Clipboard , Menu} from "lucide-react";
import { useState } from "react";

const NoteCard = ({isDark, setIsDark}) => {

  const toggleTheme = () => {
    const isDarkNow = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDarkNow ? "dark" : "light");
    setIsDark(isDarkNow);
  }

  return (
    <main className="flex-1 bg-stone-50 min-h-screen dark:bg-slate-800 dark:text-slate-100 transition-all duration-300 ease-in-out">
      <section className="h-11 mt-4">
          <div className="flex items-center justify-between">
            <h1 className="font-semibold bg-stone-200 rounded-lg px-4 py-1 ml-2 dark:bg-slate-900 transition-all duration-300 ease-in-out">Title</h1>
            <div onClick={toggleTheme} className="relative mr-5 rounded-full w-14 h-7 bg-slate-100 dark:bg-slate-900">
              {isDark ? <Moon className="absolute right-0.5 top-0.5 bg-slate-900 text-slate-200 rounded-full p-1 scale-100"/> : <Sun className="absolute left-0.5 top-0.5 bg-slate-200 text-slate-900 rounded-full p-1 scale-100" /> }
            </div>
          </div>
      </section>
      <div className="h-36 bg-[url('/BackgroundVioletScenery.jpg')] bg-cover bg-center rounded-lg" />
    </main>
  )
}

export default NoteCard