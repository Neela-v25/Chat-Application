import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { authActions } from "../features/auth/authSlice";

function SnackBar({toastMessage, status}) {
  const [isClosed, setIsClosed] = useState(false)
  const dispatch = useDispatch();

  const handleCloseToast = () => {
    setIsClosed(true);
    dispatch(authActions.setToast({isVisible: false}))
  }

  useEffect(() => {
    const timer = setTimeout(handleCloseToast, 3000)

    return () => {
      clearTimeout(timer);
    }
  }, [])
  
  return (
    <div className={`fixed bottom-4 left-4 p-4 rounded shadow-md text-white w-1/3 ${status==='error' ? 'bg-red-400' : 'bg-green-500'} ${isClosed && 'hidden'}`}>
        <div className='flex justify-between items-center'>
            <span>{toastMessage}</span>
            <button onClick={handleCloseToast}>X</button>
        </div>
    </div>
  )
}

export default SnackBar