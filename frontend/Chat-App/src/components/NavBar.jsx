import react from '../assets/react.svg';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';

function NavBar() {
  return (
    <div className='w-screen h-10 bg-transparent flex justify-between items-center mt-5 p-2'>
        <img src={react} alt='' className='h-10 w-5' />
        <SettingsIcon className='ml-auto mr-10' />
        <LogoutIcon className='self-end'/>
    </div>
  )
}

export default NavBar