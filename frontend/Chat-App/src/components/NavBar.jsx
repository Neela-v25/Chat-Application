import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from '@mui/icons-material/Person';
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { useNavigateActions } from "../hooks/useNavigateActions";

function NavBar() {
  const { fullName, username, _id } = useSelector(
    (state) => state.auth.loggedInUser
  );
  const { logoutAndNavigate } = useNavigateActions();

  return (
    <div className="w-screen h-10 bg-transparent flex justify-between items-center mt-5 p-2">
      <Link to={`/${_id}`} className="text-3xl font-serif">Hey {fullName}!!</Link>
      <Link
        to={`/${username}/settings`}
        className="ml-auto mr-10 cursor-pointer"
      >
        <PersonIcon fontSize="medium"/>
      </Link>
      <LogoutIcon className="self-end cursor-pointer" onClick={logoutAndNavigate} />
    </div>
  );
}

export default NavBar;
