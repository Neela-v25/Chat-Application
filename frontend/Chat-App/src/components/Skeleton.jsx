import Skeleton from '@mui/material/Skeleton';


export const UserSkeleton = (isSideBar) => {
    return(
        <div className={`${isSideBar ? 'ml-5 mt-5' : ''}`}>
            {[...Array(5)].map((_, index) => 
                <div className='flex gap-2 items-center space-y-4 space-x-4' key={index}>
                    <Skeleton variant='circular' width={40} height={40} sx={{backgroundColor: '#eee'}}/>
                    <Skeleton variant='rounded' width={200} height={40} sx={{backgroundColor: '#eee'}}/>
                </div>
            )}
        </div>
    )
}

function SkeletonLoader() {
  return (  
    <div className='space y-2'>
        {Array(6).fill(null).map((_, index) => 
        <span className={`flex gap-1 items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`} key={index}>
            {index % 2 === 0 && <Skeleton variant='circular' width={40} height={40}/>}
            <Skeleton 
                variant='rounded' 
                width={210} 
                height={40} 
                animation="wave"
            />
            {index % 2 !== 0 && <Skeleton variant='circular' width={40} height={40} />}
        </span>
        )}
    </div>
  )
}

export default SkeletonLoader;