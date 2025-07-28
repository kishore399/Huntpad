import NotesList from "./NotesList";
import { useNavigate } from "react-router";
import { ChevronsLeft, Search, Plus, CirclePlus } from "lucide-react";
import { useAppStore } from "../store/appStore";
import { useAuthStore } from "../store/authStore";

const Sidebar = ({ handleProfileClick, handleSearch }) => {

  const isCollapsed = useAppStore((s) => s.isCollapsed);
  const setIsCollapsed = useAppStore((s) => s.setIsCollapsed);
  const user = useAuthStore((s) => s.user);
  const createNote = useAppStore((s) => s.createNote);

  const navigate = useNavigate();
  
  const createPage = async () => {
    await createNote((id) => navigate(`/home/notes/${id}`));
  }

  return (
    <aside className={`z-10 ${isCollapsed ? "hidden": "w-screen fixed top-0 left-0 sm:static sm:w-48" } min-h-screen text-slate-700 font-semibold overflow-y-auto bg-slate-200 px-2 space-y-2 dark:bg-gray-700 dark:text-slate-300 cursor-pointer shrink-0 t`}>
        <div className="">
          <div className="bg-slate-300 rounded-lg my-2 mx-1 p-2 dark:text-white dark:bg-slate-800 t flex items-center justify-between cursor-pointer">
            <div onClick={handleProfileClick} className="flex justify-center items-center gap-2 overflow-hidden pr-2">
              <div className="w-7 h-7 m-0.5 shrink-0 rounded-full bg-cover bg-center" style={{backgroundImage: `url(${user.profilePic || "/avatar.png"})`}}></div>
              <p className="truncate sm:max-w-[90px] ">{user.fullName}</p>
            </div>
            <ChevronsLeft onClick={setIsCollapsed} className="hover:scale-110 shrink-0" />
          </div>
        </div>
        <div className="space-y-1 pt-2 ml-2">
          <div onClick={handleSearch} className="flex items-center hover:bg-gray-300 dark:hover:bg-gray-600 py-1 px-0.5 rounded-lg t">
            <Search className="scale-75 inline mr-2" />
            Search
          </div>
          <div onClick={createPage} className="flex items-center hover:bg-gray-300 dark:hover:bg-gray-600 py-1 px-0.5 rounded-lg t">
            <CirclePlus className="scale-75 inline mr-2" />
            New page
          </div>
        <NotesList />
        <div onClick={createPage} className="flex items-center hover:bg-gray-300 dark:hover:bg-gray-600 py-1 px-0.5 rounded-lg t">
          <Plus className="scale-75 inline mr-1" />
          Add a page
        </div>
      </div>
    </aside>
  )
}

export default Sidebar