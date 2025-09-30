import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authThunks'
import { useNavigate } from 'react-router';

function NavBar() {
  const { fullName } = useSelector(state => state.loggedInUser);
  const authUser = useSelector(state => state.authUser);
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
        <SettingsIcon className='ml-auto mr-10' />
        <LogoutIcon className='self-end' onClick={handleLogout}/>
    </div>
  )
}

export default NavBar