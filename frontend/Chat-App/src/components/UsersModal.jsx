import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUsersList } from "../features/chat/userThunks";
import Button from "@mui/material/Button";
import { userActions } from "../features/chat/userSlice";
import avatar from "../assets/avatar.png";
import { useNavigateActions } from "../hooks/useNavigateActions";
import { UserSkeleton } from "./Skeleton";

function UsersModal({ onClose }) {
  const users = useSelector((state) => state.user.usersList);
  const isFetchingUsers = useSelector((state) => state.user.isFetchingUsers);
  const dispatch = useDispatch();
  const openChatAndNavigate = useNavigateActions();

  useEffect(() => {
    dispatch(getUsersList());
  }, [dispatch]);

  const handleSelectUser = (user) => {
    dispatch(userActions.setUserToChat(user));
    openChatAndNavigate(user);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-lg z-10"
      onClick={onClose}
    >
      <dialog
        className="fixed inset-0 flex flex-col p-4 gap-2 h-2/3 w-2/4 m-auto bg-white text-black z-50 shadow-md rounded-2xl"
        open
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <input
            type="text"
            placeholder="Search for a new user to chat"
            className="w-full bg-gray-300 rounded p-4 outline-none"
          />
        </div>
        <List sx={{ height: "inherit", overflowY: "auto" }}>
          {isFetchingUsers ? (
            <UserSkeleton />
          ) : (
            users.map((item) => (
              <ListItemButton
                key={item.username}
                alignItems="flex-start"
                sx={{
                  "&:hover": {
                    bgcolor: "grey",
                    cursor: "pointer",
                  },
                }}
                onClick={() => handleSelectUser(item)}
              >
                <img
                  src={item.profilePic || avatar}
                  alt={item.username}
                  className="rounded-4xl h-8 w-8"
                />
                <ListItemText className="ml-5">{item.username}</ListItemText>
              </ListItemButton>
            ))
          )}
        </List>
        <Button className="self-end" variant="outlined" onClick={onClose}>
          Close
        </Button>
      </dialog>
    </div>
  );
}

export default UsersModal;
