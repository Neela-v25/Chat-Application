import MainSection from '../components/MainSection';
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Divider from '@mui/material/Divider'

function UserPage() {
  return (
        <>
            <NavBar className='shrink-0' />
            <div className='flex flex-1 gap-2.5 h-full'>
              <SideBar />
              <Divider orientation="vertical" variant="middle" flexItem sx={{bgcolor: 'white'}}/>
              <MainSection />
            </div>
        </>
  )
}

export default UserPage