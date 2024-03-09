import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/hooks/AuthProvider';

const Logout = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();
  
    useEffect(() => {
      logOut();
      localStorage.setItem('loggedOut', 'true'); // Zapisz informację o wylogowaniu
      // Emituj zdarzenie, informujące o wylogowaniu
      window.dispatchEvent(new Event('loggedOut'));
      navigate('/', { replace: true });
    }, [logOut, navigate]);
  
    return null;
  };

export default Logout;
