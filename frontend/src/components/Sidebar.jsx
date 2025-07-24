import NotesList from "./NotesList";
import { useNavigate } from "react-router";
import { ChevronsRight, ChevronsLeft, Search, Plus, CirclePlus } from "lucide-react";
import { useAppStore } from "../store/appStore";
import { useAuthStore } from "../store/authStore";
import { useHotkeys } from "react-hotkeys-hook";

const Sidebar = ({ handleProfileClick, handleSearch }) => {

  const isCollapsed = useAppStore((s) => s.isCollapsed);
  const setIsCollapsed = useAppStore((s) => s.setIsCollapsed);
  const user = useAuthStore((s) => s.user);
  const createNote = useAppStore((s) => s.createNote);

  const navigate = useNavigate();

  useHotkeys("ctrl+k, meta+k",() => {
    console.log("searching");
    },
    {
      enableOnFormTags: true,
      preventDefault: true,
      enableOnContentEditable: true,
    },
  );

  const createPage = async () => {
    await createNote((id) => navigate(`/notes/${id}`));
  }

  return (
    <aside className={`z-10 ${isCollapsed ? "hidden": "w-screen fixed top-0 left-0 sm:static sm:w-48" } min-h-screen text-slate-700 font-semibold overflow-y-auto bg-slate-200 px-2 space-y-2 dark:bg-gray-700 dark:text-slate-300 cursor-pointer shrink-0 t`}>
        <div>
          <div className="bg-slate-300 rounded-lg my-2 mx-1 p-2 dark:text-white dark:bg-slate-800 t flex items-center justify-between cursor-pointer">
            <div onClick={handleProfileClick} className="flex justify-center items-center gap-2 overflow-hidden pr-2">
              <div className={`w-7 h-7 m-0.5C shrink-0 rounded-full ${user.profilePic ? `bg-[url(${user.profilePic})]` : "bg-[url('/avatar.png')]" } bg-cover bg-center bg-no-repeat`}></div>
              <p className="truncate sm:max-w-[90px] ">{user.fullName}</p>
            </div>
            <ChevronsLeft onClick={setIsCollapsed} className="hover:scale-110 shrink-0" />
          </div>
        </div>
        <div className="space-y-2 ml-2">
          <div onClick={handleSearch} className="">
            <Search className="scale-75 inline mr-2" />
            Search
          </div>
          <div onClick={createPage} className="">
            <CirclePlus className="scale-75 inline mr-2" />
            New page
          </div>
        <NotesList />
        <div onClick={createPage}>
          <Plus className="scale-75 inline mr-2" />
          Add a page
        </div>
      </div>
    </aside>
  )
}

export default Sidebar