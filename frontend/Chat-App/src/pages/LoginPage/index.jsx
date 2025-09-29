import { useDispatch, useSelector } from 'react-redux';
import InputForm from './InputForm';
import { checkAuth, userActions } from '../../store';

function LoginPage() {

  const isSignUp = useSelector(state => state.isSignUp);
  const dispatch = useDispatch();

  const handleSignUp = () => {
    console.log("Inside signup")
    dispatch(userActions.signup(true))
  }

  const handleLogin = () => {
    console.log("Inside log in")
    dispatch(checkAuth());
  }

  const createAccount = () => {
    dispatch(userActions.signup(false))
  }


  return (
    <div className='bg-white m-auto h-4/6 w-4/6 border rounded-3xl flex justify-center items-center'>
        <InputForm 
          isSignUp={isSignUp} 
          handleLogin={handleLogin} 
          handleSignUp={handleSignUp} 
          createAccount={createAccount}
        />
    </div>
  )
}

export default LoginPage