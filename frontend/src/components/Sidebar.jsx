import NotesList from "./NotesList";
import { ChevronsRight, ChevronsLeft, Search, Plus, CirclePlus } from "lucide-react";
import { useAppStore } from "../store/appStore";
import { useAuthStore } from "../store/authStore";

const Sidebar = () => {

  const isCollapsed = useAppStore((s) => s.isCollapsed);
  const setIsCollapsed = useAppStore((s) => s.setIsCollapsed);
  const user = useAuthStore((s) => s.user);

  return (
    <aside className={`z-10 ${isCollapsed ? "hidden": "w-screen fixed top-0 left-0 sm:static sm:w-48" } min-h-screen overflow-y-auto bg-slate-200 px-2 space-y-2 dark:bg-gray-700 dark:text-slate-300 t`}>
        <div>
          <div className="bg-slate-300 rounded-lg my-2 mx-1 p-2 dark:text-white dark:bg-slate-800 t flex items-center justify-between">
            <div className="flex justify-center items-center gap-1 overflow-hidden">
              <div className={`w-5 h-5 rounded-full ${user.profilePic ? `bg-[url(${user.profilePic})]` : "bg-violet-600" }`}></div>
              <p>{user.fullName}</p>
            </div>
            <ChevronsLeft onClick={setIsCollapsed} className="hover:scale-110" />
          </div>
        </div>
        <div className="space-y-1">
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