import Avatar from '@mui/material/Avatar';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getMessages } from '../../../features/chat/userThunks';
import SkeletonLoader from '../../Skeleton';

function ChatComponent({selectedUser}) {
  const loggedInUser = useSelector(state => state.auth.loggedInUser);
  const messageHistory = useSelector(state => state.user.messageHistory);
  const isMessagesLoading = useSelector(state => state.user.isMessagesLoading);

  const style = {
    loggedInUser: "p-2 rounded shadow w-fit ml-auto bg-blue-400",
    selectedUser: "bg-white p-2 rounded shadow w-fit text-black"
  }

    const dispatch = useDispatch();
    useEffect(() => {
      if(selectedUser){
        dispatch(getMessages(selectedUser._id))
      }
    }, [dispatch, selectedUser])

  return (
    <div className="flex-1 max-h-9/12 overflow-y-auto max-w-11/12 p-3 bg-pink-100 border-0 rounded-2xl">
        <div className="space-y-2">
          {messageHistory?.map((msg) => { 
               return(
              <span className='flex gap-1' key={msg._id}>
                {msg.senderId !== loggedInUser._id && <Avatar alt={selectedUser?.username} src={selectedUser?.profilePic} />}
                <span 
                  className={msg.senderId === loggedInUser._id ? style.loggedInUser : style.selectedUser}
                >
                  {msg.text || msg.image}
                </span>
                {msg.senderId === loggedInUser._id && <Avatar alt={loggedInUser?.username} src={loggedInUser?.profilePic} />}
              </span>)
          })}
        </div>
        {isMessagesLoading && <SkeletonLoader /> }
        
    </div>
  )
}

export default ChatComponent