import { useDispatch, useSelector } from 'react-redux';
import InputForm from '../components/InputForm';
import { login } from '../features/auth/authThunks'
import LoadingPage from '../components/LoadingIndicator';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { validateForm } from '../lib/validateForm';


function LoginPage() {

  const isCheckingAuth = useSelector(state => state.auth.isCheckingAuth);
  const loggedInUser = useSelector(state => state.auth.loggedInUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    if(loggedInUser.username)
      navigate(`/${loggedInUser.username}`)
  }, [loggedInUser, navigate])

  const handleSignUp = () => {
    navigate("/signup")
  }

  const handleLogin = (username, password) => {
    if(validateForm(dispatch, {username, password}))
      dispatch(login({username, password}));
  }

  return (
    <div className='bg-white m-auto h-4/6 w-4/6 border rounded-3xl flex justify-center items-center'>
        <InputForm 
          handleLogin={handleLogin} 
          handleSignUp={handleSignUp} 
        />
        {isCheckingAuth && <LoadingPage />}
    </div>
  )
}

export default LoginPage