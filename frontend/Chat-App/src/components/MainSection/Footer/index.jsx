import SendIcon from '@mui/icons-material/Send';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useDispatch } from 'react-redux';
import { sendMessage } from '../../../features/chat/userThunks';
import { useRef } from 'react';

function Footer({ selectedUser }) {
  const dispatch = useDispatch();
  const messageRef = useRef(null);
  const handleSendMessage = () => {
    if(messageRef.current){
      const messageToSend = {
        text: messageRef.current.value,
        receiverId: selectedUser._id,
      }
      dispatch(sendMessage(messageToSend))
    }
  }

  return (
    <div className="flex gap-4 p-2 shrink-0 h-16 w-11/12 border rounded mt-auto">
        <FileUploadIcon className='self-center' />
        <textarea
          className="w-full p-2 border-none rounded resize-none outline-0"
          placeholder="Type a message..."
          rows={2}
          ref={messageRef}
        />
        <SendIcon className='self-center shrink-0 cursor-pointer' onClick={handleSendMessage} />
    </div>
  )
}

export default Footer;