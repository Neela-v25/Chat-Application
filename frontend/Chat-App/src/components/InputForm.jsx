import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { useRef, useState } from 'react';
import Button from '@mui/material/Button';


function InputForm({isSignUp=false, handleLogin=()=>{}, handleSignUp=()=>{}, createAccount=()=>{}}) {
    const [showPassword, setShowPassword] = useState(false);
    const userRef = useRef(null);
    const passwordRef = useRef(null);
    const fullNameRef = useRef(null);

    const handleClickShowPassword = () => {
        setShowPassword(prev => !prev)
    }


    return (
        <form className='text-black flex flex-col gap-4 items-center'>
            <p className='text-fuchsia-950 font-bold'>Login to connect with your friends!</p>
            <TextField
                label="Username"
                type="text"
                sx={{ m: 1, width: '30ch' }}
                inputRef={userRef}
            />
            {isSignUp && 
                <TextField
                    label="Full Name"
                    type="text"
                    sx={{ m: 1, width: '30ch' }}
                    inputRef={fullNameRef}
                />
            }
            <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                sx={{ m: 1, width: '30ch' }}
                inputRef={passwordRef}
                slotProps={{
                input: {
                    endAdornment: <InputAdornment position="end">
                    <IconButton
                        onClick={handleClickShowPassword}
                    >
                        {!showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                    </InputAdornment>,
                },
                }}
            />
            <Button 
                variant="contained" 
                sx={{backgroundColor: "#501836"}} 
                onClick={isSignUp ? () =>createAccount(userRef.current.value, passwordRef.current.value, fullNameRef.current.value) : () => handleLogin(userRef.current.value, passwordRef.current.value) } 
            >
                {isSignUp ? "Create Account" : "Login"}
            </Button>
            {!isSignUp && <div className='flex gap-1.5 items-center'>
                    <p>Don't have an account?</p>
                    <Button 
                        size="small" 
                        sx={{color: "#501836", fontWeight: "600"}} 
                        onClick={handleSignUp}
                    >
                        Sign up
                    </Button>
                </div>}
            </form>
    )
}

export default InputForm