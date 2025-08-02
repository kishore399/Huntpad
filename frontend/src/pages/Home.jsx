import NoteCard from "../components/NoteCard";
import Sidebar from "../components/Sidebar";
import { Outlet, useNavigate, useParams } from "react-router";
import { useState, useEffect, use } from "react";
import ProfilePage from "./ProfilePage";
import SearchBar from "./SearchBar";
import { useAppStore } from "../store/appStore";
import { useHotkeys } from "react-hotkeys-hook";


const Home = () => {

  const [showProfile, setShowProfile] = useState(false);
  const [showSearchbar, setShowSearchbar] = useState(false);
  const isCollapsed = useAppStore((s) => s.isCollapsed);
  const setIsCollapsed = useAppStore((s) => s.setIsCollapsed);
  const getNotes = useAppStore((s) => s.getNotes);
  const notes = useAppStore((s) => s.notes);
  const isGettingNotes = useAppStore((s) => s.isGettingNotes);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (window.innerWidth >= 640) {
      setIsCollapsed();
    }

    const fetchNotes = async () => {
      await getNotes();
    }
    fetchNotes();
  }, [])

  useEffect(() => {
    if (isGettingNotes) {
      return;
    }
    if (id) {
      const note = notes.find(n => n._id === id);
      if(!note){
        navigate("/home/404");
      }
    }
  },[id, isGettingNotes]);

  useHotkeys("ctrl+p, meta+p", () => {
    if (showSearchbar) {
      setShowSearchbar(false);
    }
    setShowProfile(prev => !prev);
    },
    {
      enableOnFormTags: true,
      preventDefault: true,
      enableOnContentEditable: true,
    },
  );

  useHotkeys("ctrl+k, meta+k", () => {
    if (showProfile) {
      setShowProfile(false);
    }
    setShowSearchbar(prev => !prev);
    },
    {
      enableOnFormTags: true,
      preventDefault: true,
      enableOnContentEditable: true,
    },
  );

  useHotkeys("ctrl+b, meta+b", () => {
    setIsCollapsed();
    },
    {
      enableOnFormTags: true,
      preventDefault: true,
      enableOnContentEditable: true,
    },
  );

  return (
    <div className="relative w-screen min-h-screen overflow-y-auto bg-stone-100 dark:bg-zinc-900 t">
      <div className="flex flex-col overflow-y-auto t">
        <div className="flex">
          <Sidebar 
            handleProfileClick={() => setShowProfile(prev => !prev)}
            handleSearch={() => setShowSearchbar(prev => !prev)}
          />
          <NoteCard>
            <Outlet />
          </NoteCard>
        </div>
      </div>
      {showProfile && <ProfilePage close={() => setShowProfile(false)} />}
      {showSearchbar && <SearchBar close={() => setShowSearchbar(false)} />}
    </div>
  )
}

export default Home