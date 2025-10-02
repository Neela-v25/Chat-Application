import ChatComponent from './ChatComponent';
import Footer from './Footer';
import Header from './Header';
import { useSelector } from 'react-redux';

function MainSection() {
  const selectedUser = useSelector(state => state.user.selectedUser);
  return (
    <div className="flex flex-col gap-2 h-full w-full pb-2">
      {selectedUser  ? 
        <>
          <Header fullName={selectedUser?.fullName}/>
          <ChatComponent />
          <Footer />
        </> 
        : 
        <div className='m-auto text-2xl'>Open a chat to view and send messages!</div>
      }
    </div>
  )
}

export default MainSection