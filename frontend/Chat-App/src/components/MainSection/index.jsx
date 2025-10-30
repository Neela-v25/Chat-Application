import ChatComponent from './ChatComponent';
import ChatFooter from './ChatFooter';
import ChatHeader from './ChatHeader';
import { useSelector } from 'react-redux';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

function MainSection() {
  const selectedUser = useSelector(state => state.user.selectedUser);

  return (
    <div className="flex flex-col gap-2 h-full w-full">
      {selectedUser  ? 
        <>
          <ChatHeader selectedUser={selectedUser}/>
          <ChatComponent selectedUser={selectedUser}/>
          <ChatFooter selectedUser={selectedUser}/>
        </> 
        : 
        <div className='m-auto text-2xl flex flex-col items-center'>
          <ChatBubbleIcon className='animate-pulse' fontSize='large'/>
          Open a chat to view and send messages!
        </div>
      }
    </div>
  )
}

export default MainSection