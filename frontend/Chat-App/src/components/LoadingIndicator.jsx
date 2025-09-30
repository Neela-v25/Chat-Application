import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';

export default function LoadingPage() {
  const isCheckingAuth = useSelector(state => state.isCheckingAuth);

  return (
    <div>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={isCheckingAuth}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}