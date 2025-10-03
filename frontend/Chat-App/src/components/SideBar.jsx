import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import {useSelector, useDispatch} from 'react-redux';
import { useEffect, useState } from 'react';
import UsersModal from './UsersModal';
import { userActions } from '../features/chat/userSlice';
import Divider from '@mui/material/Divider';

function SideBar() {
  const users = useSelector(state => state.user.existingUsers);
  const dispatch = useDispatch()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

//   useEffect(()=>{
//     dispatch(getUsersList());
//   }, [dispatch])


  const handleClick = () => {
    setIsDialogOpen(true);
  }

  const handleSelectChat = (user) => {
    dispatch(userActions.setSelectedUser(user))
  }

  return (
    <div className='flex flex-col w-full max-w-90 max-h-full'>
        <div className='flex justify-between'>
            <p className='text-2xl ml-4 font-serif'>Messages</p>
            <button className='text-3xl self-end cursor-pointer' onClick={handleClick}>+</button>
        </div>
        <List>
            {users?.map(item =>       
                <ListItemButton 
                    alignItems="flex-start" 
                    key={item.username}           
                    sx={{
                        "&:hover": {
                        bgcolor: "rgba(255,255,255,0.1)",
                        cursor: "pointer"
                        },
                    }}
                    onClick={() => handleSelectChat(item)}
                >
                    <ListItemAvatar>
                        <Avatar alt={item.username} src={item.profilePic} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={item.username}
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
        {isDialogOpen && <UsersModal onClose={() => setIsDialogOpen(false)}/>}
    </div>
  )
}

export default SideBar