import Avatar from '@mui/material/Avatar';

function Header() {
  return (
    <div className="flex items-center gap-2.5 bg-transparent shrink-0">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <h3 className="text-lg font-semibold">User Name</h3>
    </div>
  )
}

export default Header