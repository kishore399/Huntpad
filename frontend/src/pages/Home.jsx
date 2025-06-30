import NoteCard from "../components/NoteCard";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";


const Home = () => {
  return (
    <div className="flex flex-col w-screen min-h-screen overflow-y-auto bg-stone-50 dark:bg-zinc-900 t">
      <div className="flex">
        <Sidebar />
        <NoteCard />
      </div>
    </div>
  )
}

export default Home