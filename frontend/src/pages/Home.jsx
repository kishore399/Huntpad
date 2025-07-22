import NoteCard from "../components/NoteCard";
import Sidebar from "../components/Sidebar";
import { Outlet, useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import ProfilePage from "./ProfilePage";
import { useAppStore } from "../store/appStore";
import { useHotkeys } from "react-hotkeys-hook";


const Home = () => {

  const [showProfile, setShowProfile] = useState(false);
  const getNotes = useAppStore((s) => s.getNotes);
  const notes = useAppStore((s) => s.notes);
  const isGettingNotes = useAppStore((s) => s.isGettingNotes);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
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
        navigate("/404");
      }
    }
  },[id, isGettingNotes]);

  return (
    <div className="relative w-screen min-h-screen overflow-y-auto bg-stone-50 dark:bg-zinc-900 t">
      <div className="flex flex-col overflow-y-auto t">
        <div className="flex">
          <Sidebar handleProfileClick={() => setShowProfile(true)}/>
          <NoteCard>
            <Outlet />
          </NoteCard>
        </div>
      </div>
      {showProfile && <ProfilePage close={() => setShowProfile(false)} />}
    </div>
  )
}

export default Home