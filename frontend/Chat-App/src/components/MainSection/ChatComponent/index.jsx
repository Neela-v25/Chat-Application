import Avatar from '@mui/material/Avatar';

function ChatComponent() {
  return (
    <div className="flex-1 max-h-9/12 overflow-y-auto max-w-11/12 p-3 bg-pink-100 border-0 rounded-2xl">
        <div className="space-y-2">
          <span className='flex gap-1'>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <span className="bg-white p-2 rounded shadow w-fit text-black">Hello!</span>
          </span>
          <span className='flex gap-1'>
            <span className="p-2 rounded shadow w-fit ml-auto bg-blue-400">How are you!</span>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/3.jpg" />
          </span>
          {/* repeat mock messages */}
        </div>
    </div>
  )
}

export default ChatComponent