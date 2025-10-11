import { useEffect } from "react";
import MainSection from "../components/MainSection";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Divider from "@mui/material/Divider";
import { useDispatch } from "react-redux";
import { checkAuth } from "../features/auth/authThunks";

function UserPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  return (
    <>
      <NavBar className="shrink-0" />
      <div className="flex flex-1 gap-2.5 h-full mt-5">
        <SideBar />
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{ bgcolor: "white" }}
        />
        <MainSection />
      </div>
    </>
  );
}

export default UserPage;
