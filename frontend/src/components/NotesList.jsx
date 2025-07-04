import { useAppStore } from "../store/appStore"

const NotesList = () => {

  const Notes = useAppStore((s) => s.notes)

  return (
    <div>
      {Notes?.map((note,index) => 
        <div key={index}>
          Hi
        </div>
      )}
    </div>
  )
}

export default NotesList