import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { userActions } from "../features/chat/userSlice";
import { logout } from "../features/auth/authThunks";

export const useNavigateActions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.auth.loggedInUser);

  const openChatAndNavigate = (user) => {
    dispatch(userActions.setSelectedUser(user));
    navigate(`/${loggedInUser._id}/chat/${user.username}`);
  };

  const logoutAndNavigate = () => {
    dispatch(logout());
    if (!loggedInUser.id) navigate("/");
  };

  return { openChatAndNavigate, logoutAndNavigate };
};
