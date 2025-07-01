import { useAuthStore } from "../store/authStore"

const ProfilePage = ({close}) => {
    
  const updateProfilePic = useAuthStore((s) => s.updateProfilePic);

  return (
    <div onClick={close} className="absolute z-20 inset-0 flex justify-center items-center backdrop-blur-xs p-4">
      <div onClick={(e) => e.stopPropagation()} className=" bg-slate-300 dark:bg-gray-800 dark:text-stone-100 rounded-lg flex flex-col justify-center items-center gap-2">
        <div className="p-4 w-96">
          <div className="flex flex-col justify-center items-center">
            <h1 className="m-2 text-3xl wor font-bold">Profile</h1>
            <h1 className="font-semibold text-md">Your Profile Information</h1>
            <div className="size-32 rounded-full bg-violet-600 m-4"></div>
            <h1 className="text-sm">Click to update your profile picture</h1>
          </div>
          <div>
            Fullname, email
          </div>
          <div>
            Account info
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage