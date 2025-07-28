import { useAuthStore } from "../store/authStore";
import { User, Mail, CalendarClock } from "lucide-react";
import { useRef } from "react";
import { formatDate } from "../utils/dateFormatter";
import { toast } from "react-hot-toast";

const ProfilePage = ({close}) => {
    
  const updateProfilePic = useAuthStore((s) => s.updateProfilePic);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const inputRef = useRef(null);

  const time = formatDate(user.createdAt);
  const date = time.split(",")[0];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Error logging out:", err);
    }
  }

  const handleProfilePicClick = () => {
    inputRef.current.click();
  }

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        toast.error("File size exceeds 4MB limit");
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = async () => {
        await updateProfilePic(reader.result);
      };
    }
  }

  return (
    <div onClick={close} className="absolute z-20 inset-0 flex justify-center items-center backdrop-blur-sm p-4 cursor-default t">
      <div onClick={(e) => e.stopPropagation()} className=" bg-slate-300 shadow-lg shadow-slate-700 dark:bg-gray-800 dark:text-stone-100 rounded-3xl flex flex-col justify-center items-center gap-2 t hover:translate-y-[-4px]">
        <div className="p-4 w-96 sm:w-[500px]">
          <div className="flex flex-col justify-center items-center">
            <h1 className="m-2 text-3xl wor font-bold">Profile</h1>
            <h1 className="font-semibold text-md">Your Profile Information</h1>
            <div onClick={handleProfilePicClick} className="size-32 rounded-full bg-cover bg-center cursor-pointer m-4" style={{backgroundImage: `url(${user.profilePic || "/avatar.png"})`}}/>
            <h1 className="text-sm">Click to update your profile picture</h1>
          </div>
          <div className="mt-3 dark:text-stone-50">
            <div className="my-4">
              <div className="flex items-center justify-start gap-2 px-1">
                < User className="scale-90"/>
                <h1 className="text-sm text-slate-800 dark:text-slate-300">Full Name</h1>
              </div>
              <div className="truncate bg-slate-200 border-2 border-stone-200 rounded-lg p-2 my-1 dark:bg-slate-900 dark:border-zinc-900 cursor-not-allowed">{user.fullName}</div>
            </div>
            <div className="mt-2">
              <div className="flex items-center justify-start gap-2 px-1">
                < Mail className="scale-90"/>
                <h1 className="text-sm text-slate-800 dark:text-slate-300">Email Address</h1>
              </div>
              <div className="truncate bg-slate-200 border-2 border-stone-200 rounded-lg p-2 my-1 dark:bg-slate-900 dark:border-zinc-900 cursor-not-allowed">{user.email}</div>
            </div>
          </div>
          <div className="flex items-center justify-between my-4 mx-2 text-slate-900 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <CalendarClock className="scale-90"/>
            <h1>Member Since</h1>
            </div>
            <h1 title={time}>{date}</h1>
          </div>
          <input type="file" accept="image/*" ref={inputRef} onChange={(e) => handleProfilePicChange(e)} className="hidden" />
          <div className="flex gap-2 justify-end mt-3">
            <button onClick={handleLogout} className="dark:bg-red-700 bg-red-500 font-semibold p-2 px-6 rounded-lg m-2 mx-6 cursor-pointer text-stone-50 hover:scale-105 hover:bg-red-600 dark:hover:bg-red-800">Logout</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage