import NotesList from "./NotesList";
import { ChevronsRight, ChevronsLeft, Search, Plus, CirclePlus } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-48 max-sm:hidden min-h-screen bg-slate-200 px-2 space-y-2 dark:bg-gray-700 dark:text-slate-300 transition-all duration-300 ease-in-out">
        <div>
          <div className="bg-slate-300 rounded-lg my-2 p-2 dark:text-white dark:bg-slate-800 transition-all duration-300 ease-in-out">
            Profile
          </div>
        </div>
        <div>
          <div className="">
            <Search className="scale-75 inline" />
            Search
          </div>
          <div>
            <CirclePlus className="scale-75 inline" />
            New page
          </div>
        </div>
        <NotesList />
        <div>
          <Plus className="scale-75 inline" />
          Add a page
        </div>
    </aside>

  )
}

export default Sidebar