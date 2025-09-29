import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

//sx={{ width: '100%', maxWidth: 350, maxHeight: 'auto', bgcolor: 'transparent' }}
function SideBar() {
    const users = ['Alice', 'Bob', 'Catherine', 'David' ]
  return (
    <div className='flex flex-col w-full max-w-90 max-h-full'>
        <div className='flex justify-between'>
            <p className='text-3xl'>Messages</p>
            <button className='text-3xl self-end cursor-pointer'>+</button>
        </div>
        <List>
            {users.map(item =>       
                <ListItemButton 
                    alignItems="flex-start" 
                    key={item}           
                    sx={{
                        "&:hover": {
                        bgcolor: "rgba(255,255,255,0.1)",
                        cursor: "pointer"
                        },
                    }}
                >
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        primary={item}
                        secondary={"Message"}
                        slotProps={{
                            secondary: {
                                display: 'inline',
                                sx:{color: 'white', marginLeft: '5px'}
                            }
                        }}
                    />
                </ListItemButton>
            )}
        </List>
    </div>
  )
}

export default SideBar