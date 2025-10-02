import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";

function SettingsPage() {

  const loggedInUser = useSelector(state => state.auth.loggedInUser)
  return (
    <div className="fixed inset-0 m-auto h-2/3 w-2/5 shadow-md rounded flex flex-col gap-10 bg-amber-50 p-4 items-center text-black">
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={
          <CameraAltIcon fontSize='large' color='primary' className="cursor-pointer" />
        }
      >
        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" sx={{ width: 140, height: 140 }} />
      </Badge>
      <p>Full Name: {loggedInUser.fullName}</p>
      <p>Username: {loggedInUser.username}</p>
      <p>Member Since: {loggedInUser.createdAt}</p>
      <p>Status: Active </p>
    </div>
  )
}

export default SettingsPage