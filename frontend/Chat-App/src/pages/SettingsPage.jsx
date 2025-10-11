import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import { useRef, useState } from "react";
import Divider from "@mui/material/Divider";
import { updateProfilePic } from "../features/auth/authThunks";
import CircularProgress from "@mui/material/CircularProgress";
import NavBar from "../components/NavBar";

function SettingsPage() {
  const loggedInUser = useSelector((state) => state.auth.loggedInUser);
  const imageInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const isUpdatingProfile = useSelector(
    (state) => state.auth.isUpdatingProfile
  );
  const dispatch = useDispatch();

  const handleSelectImage = (e) => {
    const selectedImageFile = e.target.files[0];
    if (!selectedImageFile) return;

    const reader = new FileReader();
    reader.readAsDataURL(selectedImageFile);

    reader.onload = () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      dispatch(updateProfilePic({ profilePic: base64Image }));
    };
  };

  const handleIconClick = () => {
    imageInputRef?.current?.click();
  };
  return (
    <>
      <NavBar />
      <div className="fixed inset-0 m-auto h-4/5 w-2/5 shadow-lg rounded-3xl flex flex-col gap-10 items-center bg-rose-100 p-4 text-black font-mono">
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <IconButton
              className="cursor-pointer"
              onClick={handleIconClick}
              disabled={isUpdatingProfile}
            >
              <CameraAltIcon fontSize="large" color="inherit" />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleSelectImage}
                ref={imageInputRef}
              />
            </IconButton>
          }
        >
          <Avatar
            alt={loggedInUser.username}
            src={
              !isUpdatingProfile &&
              (selectedImage ||
                loggedInUser.profilePic ||
                "/static/images/avatar/2.jpg")
            }
            sx={{ width: 140, height: 140 }}
          >
            {" "}
            {isUpdatingProfile && <CircularProgress />}
          </Avatar>
        </Badge>
        <div className="flex flex-col gap-1">
          <label>Full Name</label>
          <input
            type="text"
            disabled
            value={loggedInUser.fullName ?? ""}
            className="rounded shadow-md w-fit h-10 p-4 bg-gray-400"
          />
          <label>Username</label>
          <input
            type="text"
            disabled
            value={loggedInUser.username ?? ""}
            className="rounded shadow-md w-fit h-10 p-4 bg-gray-400"
          />
        </div>
        <div className="flex flex-col gap-1.5 w-2/3 bg-gray-400 rounded shadow-md p-4">
          <p className="text-center">Account Information</p>
          <Divider sx={{ bgcolor: "black" }} />
          <p>Member since </p>
          <p>Status</p>
        </div>
      </div>
    </>
  );
}

export default SettingsPage;
