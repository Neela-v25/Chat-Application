import { useDispatch, useSelector } from 'react-redux';
import InputForm from '../components/InputForm';
import { authActions } from '../features/auth/authSlice';
import { signup } from '../features/auth/authThunks'
import LoadingPage from '../components/LoadingIndicator';
import { useNavigate } from 'react-router';
import { validateForm } from '../lib/validateForm';

function SignUpPage() {
      const isCheckingAuth = useSelector(state => state.auth.isCheckingAuth);
      const dispatch = useDispatch();
      const navigate = useNavigate();
    
      const handleSignUp = () => {
        dispatch(authActions.signup(true))
      }
    
    
      const createAccount = (username, password, fullName) => {
        if(validateForm(dispatch, {username, password, fullName})){
          dispatch(signup({username, password, fullName}))
          !isCheckingAuth && navigate("/")
        }
      }
  return (
        <div className='bg-white m-auto h-4/6 w-4/6 border rounded-3xl flex justify-center items-center'>
        <InputForm 
          isSignUp={true} 
          handleSignUp={handleSignUp} 
          createAccount={createAccount}
        />
        {isCheckingAuth && <LoadingPage />}
    </div>
  )
}

export default SignUpPage