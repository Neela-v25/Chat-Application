import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authThunks'
import { Link, useNavigate } from 'react-router';

function NavBar() {
  const { fullName, username } = useSelector(state => state.auth.loggedInUser);
  const authUser = useSelector(state => state.auth.authUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async() => {
    await dispatch(logout()).unwrap()
    if(!authUser) {
      navigate("/")
    }
  }
  return (
    <div className='w-screen h-10 bg-transparent flex justify-between items-center mt-5 p-2'>
         Welcome {fullName}
        <Link to={`/${username}/settings`} className='ml-auto mr-10 cursor-pointer' >
          <SettingsIcon />
        </Link>
        <LogoutIcon className='self-end cursor-pointer' onClick={handleLogout}/>
    </div>
  )
}

export default NavBar