import { Moon, Sun, Menu } from 'lucide-react';
import { useAppStore } from '../store/appStore';

const Navbar = () => {

  const isDark = useAppStore((s) => s.isDark);
  const setIsDark = useAppStore((s) => s.setIsDark);
  const isCollapsed = useAppStore((s) => s.isCollapsed);
  const setIsCollapsed = useAppStore((s) => s.setIsCollapsed)

  const toggleTheme = () => {
  const isDarkNow = document.documentElement.classList.toggle("dark");
  localStorage.setItem("theme", isDarkNow ? "dark" : "light");
  setIsDark(isDarkNow);
  }

  return (
    <header className="h-11 mt-4 mr-2 text-slate-700 dark:text-stone-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between ml-3">
              <Menu onClick={setIsCollapsed} className={`${isCollapsed ? "" : "hidden"} hover:scale-110`} />
              <nav className="font-semibold text-lg rounded-lg px-4 py-1 ml-2 t">Untitled</nav>
            </div>
            <nav onClick={toggleTheme} className="relative mr-5 rounded-full w-14 h-7 bg-slate-100 dark:bg-slate-900 t">
              {isDark ? <Moon className="absolute right-0.5 top-0.5 bg-slate-900 text-slate-200 rounded-full p-1 scale-100"/> : <Sun className="absolute left-0.5 top-0.5 bg-slate-200 text-slate-900 rounded-full p-1 scale-100" /> }
            </nav>
          </div>
    </header>
  )
}

export default Navbar