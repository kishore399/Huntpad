import NotesList from "./NotesList";
import { ChevronsRight, ChevronsLeft, Search, Plus, CirclePlus } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-1/3 min-h-screen bg-slate-200 pl-4 pt-5">
        <div>
          Profile
        </div>
        <div className="">
          <Search className="scale-75 inline" />
          Search
        </div>
        <div>
          <CirclePlus className="scale-75 inline" />
          New page
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