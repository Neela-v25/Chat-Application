
import LoginPage from './pages/LoginPage'
import { BrowserRouter, Routes, Route} from 'react-router';
import UserPage from './pages/UserPage';
import SettingsPage from './pages/SettingsPage';
import { useSelector } from 'react-redux';
import SignUpPage from './pages/SignUpPage';
import SnackBar from './components/SnackBar';

function App() {
  const toast = useSelector(state => state.auth.toast);

  return (
      <div className='flex flex-col h-screen'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element= {<LoginPage />} index />
            <Route path ='/signup' element={<SignUpPage />} />
            <Route path='/:username' element= {<UserPage />} />
            <Route path='/:username/settings' element={<SettingsPage />}/>
          </Routes>
        </BrowserRouter>
        {toast.isVisible && <SnackBar toastMessage={toast.message} status={toast.status}/>}
      </div>
  )
}

export default App
