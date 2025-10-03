import Avatar from '@mui/material/Avatar';

function Header({selectedUser}) {
  return (
    <div className="flex items-center gap-2.5 bg-transparent shrink-0">
        <Avatar alt={selectedUser?.username} src={selectedUser?.profilePic} />
        <h3 className="text-lg font-semibold">{selectedUser?.fullName}</h3>
    </div>
  )
}

export default Header