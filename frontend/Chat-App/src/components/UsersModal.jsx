import List from '@mui/material/List'
import Avatar from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';
import { getUsersList } from '../features/chat/userThunks';
import Button from '@mui/material/Button'
import { userActions } from '../features/chat/userSlice'

function UsersModal({onClose}) {
  const users = useSelector(state => state.user.usersList);
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getUsersList());
  }, [dispatch])

  const handleSelectUser = (user) => {
    dispatch(userActions.setUserToChat(user));
    onClose();
  }

  return (
    <div className='fixed inset-0 bg-black/60 backdrop-blur-lg z-10' onClick={onClose}>
        <dialog 
            className="fixed inset-0 flex flex-col p-4 gap-10 h-2/3 w-2/4 m-auto bg-white text-black z-50 shadow-md rounded-2xl"
            open
            onClick={(e) => e.stopPropagation()}
        >
            
            <div>
                Search Bar
            </div>
            <List sx={{height: 'inherit', overflowY: 'auto'}}>
                {users.map(item => 
                    <ListItemButton 
                        key={item.username} 
                        alignItems='flex-start'
                        sx={{
                            "&:hover": {
                            bgcolor: "grey",
                            cursor: "pointer"
                            },
                        }}
                        onClick={() => handleSelectUser(item)}
                    >
                    <ListItemText>{item.username}</ListItemText>
                    </ListItemButton>
                )}
            </List>
            <Button className='self-end' variant='outlined' onClick={onClose}>Close</Button>
        </dialog>
    </div>
  )
}

export default UsersModal