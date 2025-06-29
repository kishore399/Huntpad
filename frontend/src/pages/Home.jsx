import NoteCard from "../components/NoteCard";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";


const Home = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <NoteCard />
      </div>
    </div>
  )
}

export default Home