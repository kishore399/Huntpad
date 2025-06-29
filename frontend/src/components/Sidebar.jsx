import NotesList from "./NotesList";
import { ChevronsRight, ChevronsLeft, Search, Plus, CirclePlus } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-48 max-sm:hidden min-h-screen rounded-md bg-slate-200 pl-4 pt-5 hover:bg-slate-300 space-y-2">
        <div>
          <div>
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