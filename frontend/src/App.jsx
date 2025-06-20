import { Route, Routes } from "react-router";
import toast from "react-hot-toast";

import HomePage from "./pages/HomePage";
import CreateNotePage from "./pages/CreateNotePage";
import NoteDetailPage from "./pages/NoteDetailPage";

const App = () => {
  return (
    <div dataitheme="luxury">
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create" element={<CreateNotePage />} />
      <Route path="/view/:id" element={<NoteDetailPage />} />
    </Routes>

    </div>
  )
}

export default App