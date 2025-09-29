import SendIcon from '@mui/icons-material/Send';
import FileUploadIcon from '@mui/icons-material/FileUpload';

function Footer() {
  return (
    <div className="flex gap-4 p-2 shrink-0 h-16 w-11/12 border rounded mt-auto">
        <FileUploadIcon className='self-center' />
        <textarea
          className="w-full p-2 border-none rounded resize-none outline-0"
          placeholder="Type a message..."
          rows={2}
        />
        <SendIcon className='self-center shrink-0' />
    </div>
  )
}

export default Footer;