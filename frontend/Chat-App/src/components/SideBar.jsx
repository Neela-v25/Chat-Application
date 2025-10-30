import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import UsersModal from "./UsersModal";
import { useNavigateActions } from "../hooks/useNavigateActions";
import { getFriendsList } from "../features/chat/userThunks";
import { UserSkeleton } from "./Skeleton";
import AvatarBadge from "./AvatarBadge";

function SideBar() {
  const users = useSelector((state) => state.user.existingUsers);
  const loggedInUser = useSelector((state) => state.auth.loggedInUser);
  const isFetchingUsers = useSelector((state) => state.user.isFetchingUsers);
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { openChatAndNavigate } = useNavigateActions();
  const selectedUser = useSelector((state) => state.user.selectedUser);

  useEffect(() => {
    if (loggedInUser?._id) dispatch(getFriendsList(loggedInUser._id));
  }, [dispatch, loggedInUser]);

  const handleClick = () => {
    setIsDialogOpen(true);
  };

  return (
    <div className="flex flex-col w-full max-w-90 max-h-full">
      <div className="flex justify-between items-center">
        <p className="text-2xl ml-4 font-serif">Messages</p>
        <button
          className="text-3xl self-end cursor-pointer"
          onClick={handleClick}
        >
          +
        </button>
      </div>
      <List>
        {isFetchingUsers ? (
          <UserSkeleton isSideBar={true} />
        ) : (
          users?.map((item) => (
            <ListItemButton
              alignItems="flex-start items-center"
              key={item.username}
              sx={{
                gap: "3px",
                bgcolor:
                  selectedUser?._id === item._id && "rgba(255,255,255,0.1)",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.1)",
                  cursor: "pointer",
                },
              }}
              onClick={() => openChatAndNavigate(item)}
            >
              <ListItemAvatar>
                <AvatarBadge sourceImg={item.profilePic} alt={item.username} userId={item._id} />
              </ListItemAvatar>
              <ListItemText
                primary={item.username}
              />
            </ListItemButton>
          ))
        )}
      </List>
      {isDialogOpen && <UsersModal onClose={() => setIsDialogOpen(false)} />}
    </div>
  );
}

export default SideBar;
