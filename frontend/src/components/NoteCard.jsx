import { Moon, Sun, Clipboard} from "lucide-react";
import { useState } from "react";

const NoteCard = () => {

    const [isDark, setIsDark] = useState(false);

  return (
    <div className="flex-1 bg-stone-50 p-3">
        <div className="flex items-center justify-between">
          <h1>Title</h1>
          <div onClick={() => setIsDark(!isDark)}>
            {isDark ? <Moon /> : <Sun /> }
          </div>
        </div>
    </div>
  )
}

export default NoteCard