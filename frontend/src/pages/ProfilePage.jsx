import { useAppStore } from "../store/appStore"

const ProfilePage = () => {
    
    const updateProfilePic = useAppStore((s) => s.updateProfilePic);

  return (
    <div>ProfilePage</div>
  )
}

export default ProfilePage