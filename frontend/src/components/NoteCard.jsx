import { Moon, Sun, Clipboard , Menu} from "lucide-react";
import { useState } from "react";

const NoteCard = () => {

    const [isDark, setIsDark] = useState(false);

  return (
    <div className="flex-1 bg-stone-50 min-h-screen">
      <div className="h-11 mt-4">
          <div className="flex items-center justify-between">
            <h1 className="font-semibold bg-stone-200 rounded-lg px-4 py-1 ml-2">Title</h1>
            <div onClick={() => setIsDark(!isDark)} className="scale-90 pr-5">
              {isDark ? <Moon /> : <Sun /> }
            </div>
          </div>
      </div>
      <div className="h-36 bg-blue-200 bg-cover bg-center rounded-lg">
        Cover Image
      </div>
    </div>
  )
}

export default NoteCard