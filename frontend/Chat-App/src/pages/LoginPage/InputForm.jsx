import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import Button from '@mui/material/Button';


function InputForm({isSignUp, handleLogin, handleSignUp, createAccount}) {
    const [showPassword, setShowPassword] = useState(false);

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
            />
            {isSignUp && 
                <>
                    <TextField
                        label="First Name"
                        type="text"
                        sx={{ m: 1, width: '30ch' }}
                    />
                    <TextField
                        label="Last Name"
                        type="text"
                        sx={{ m: 1, width: '30ch' }}
                    />
                </>
            }
            <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                sx={{ m: 1, width: '30ch' }}
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
                onClick={isSignUp? createAccount : handleLogin } 
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