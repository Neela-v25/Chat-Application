import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { authActions } from "../features/auth/authSlice";

function SnackBar({toastMessage, status}) {
  const [isClosed, setIsClosed] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(()=>{
      setIsClosed(true);
      dispatch(authActions.setToast({isVisible: false}))
    }, 3000)

    return () => {
      clearTimeout(timer);
    }
  }, [])
  
  return (
    <div className={`fixed bottom-4 left-4 p-4 rounded shadow-md text-white w-1/3 ${status==='error' ? 'bg-red-400' : 'bg-green-500'} ${isClosed && 'hidden'}`}>
        <div className='flex justify-between items-center'>
            <span>{toastMessage}</span>
        </div>
    </div>
  )
}

export default SnackBar