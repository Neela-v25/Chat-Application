
function SnackBar({toastMessage}) {
    const handleClose = () => {

    }
  return (
    <div className="fixed bottom-4 left-4 p-4 bg-white text-black w-1/3">
        <div className='flex justify-between items-center'>
            <span>{toastMessage}</span>
            <button onClick={handleClose}>X</button>
        </div>
    </div>
  )
}

export default SnackBar