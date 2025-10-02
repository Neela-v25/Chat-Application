 import { authActions } from "../features/auth/authSlice";
 
 export const validateForm = (dispatch, {username, password, fullName, isSignUp}) => {
        
        if(!username){
            dispatch(authActions.setToast({
                isVisible: true,
                message: 'User name is required!',
                status: 'error'
            }))
            return false;
        }
        if(!password){
            dispatch(authActions.setToast({
                isVisible: true,
                message: 'Password is required!',
                status: 'error'
            }))
            return false;
        }
        if(!fullName && isSignUp){
            dispatch(authActions.setToast({
                isVisible: true,
                message: 'Full name is required!',
                status: 'error'
            }))
            return false;
        }
        if(password.length < 6){
            dispatch(authActions.setToast({
                isVisible: true,
                message: 'Password length is less than 6 characters.',
                status: 'error'
            }))
            return false;
        }

        return true;
    }