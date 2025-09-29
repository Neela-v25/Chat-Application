
import LoginPage from './pages/LoginPage'
import { BrowserRouter, Routes, Route} from 'react-router';
import UserPage from './pages/UserPage';
import SettingsPage from './pages/SettingsPage';
import { Provider } from 'react-redux';
import store from './store';

function App() {

  return (
    <Provider store={store}>
      <div className='flex flex-col h-screen'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element= {<LoginPage />} index />
            <Route path='/:username' element= {<UserPage />} />
            <Route path='/:username/settings' element={<SettingsPage />}/>
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  )
}

export default App
