
import LoginPage from './pages/LoginPage'
import { BrowserRouter, Routes, Route} from 'react-router';
import UserPage from './pages/UserPage';
import SettingsPage from './pages/SettingsPage';
import { Provider } from 'react-redux';
import store from './store';
import SignUpPage from './pages/SignUpPage';
import SnackBar from './components/SnackBar';

function App() {

  return (
    <Provider store={store}>
      <div className='flex flex-col h-screen'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element= {<LoginPage />} index />
            <Route path ='/signup' element={<SignUpPage />} />
            <Route path='/:username' element= {<UserPage />} />
            <Route path='/:username/settings' element={<SettingsPage />}/>
          </Routes>
        </BrowserRouter>
        <SnackBar toastMessage='Sample toast message'/>
      </div>
    </Provider>
  )
}

export default App
