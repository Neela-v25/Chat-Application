import { useEffect } from "react";
import MainSection from "../components/MainSection";
import SideBar from "../components/SideBar";
import Divider from "@mui/material/Divider";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "../features/auth/authThunks";
import { useLocation, useNavigate, useParams } from "react-router";

function UserPage() {
  const dispatch = useDispatch();
  const selectedUser = useSelector((state) => state.user.selectedUser);
  const location = useLocation();
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (!selectedUser && location.pathname.includes("/chat/")) {
      navigate(`/${userId}`, { replace: true });
    }
  }, [selectedUser, location.pathname, userId, navigate]);
  
  return (
    <div className="flex flex-1 gap-2.5 h-full">
      <SideBar />
      <Divider
        orientation="vertical"
        variant="middle"
        flexItem
        sx={{ bgcolor: "white" }}
      />
      <MainSection />
    </div>
  );
}

export default UserPage;
