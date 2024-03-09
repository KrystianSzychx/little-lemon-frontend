import { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logoImage from './assets/logo.png';
import './Header.css';
import pages from '../../utils/pages';
import { useAuth } from '../../context/hooks/AuthProvider';
import { Alert, Snackbar } from '@mui/material';


const navLinks = Array.from(pages.values()).filter(page => page.anchorable);

// Przy założeniu, że 'Login' został już usunięty z obiektu 'pages'
const Header = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

    useEffect(() => {
      const handleLogoutEvent = () => {
        const loggedOut = localStorage.getItem('loggedOut');
        if (loggedOut === 'true') {
          setOpen(true);
          localStorage.removeItem('loggedOut');
        }
      };

      window.addEventListener('loggedOut', handleLogoutEvent);

      return () => window.removeEventListener('loggedOut', handleLogoutEvent);
  }, []);

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };  

  return (
    <header>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          You have been successfully logged out.
        </Alert>
      </Snackbar>
      <nav className="container grid nav-bar">
        <Link className="nav-bar-logo" to={pages.get('home').path}>
          <img src={logoImage} alt="Little Lemon logo" />
        </Link>
        <button className="nav-bar-hamburger" type="button" onClick={() => setIsNavExpanded(!isNavExpanded)}>
          {isNavExpanded ? <FontAwesomeIcon icon={faXmark} size="2x" /> : <FontAwesomeIcon icon={faBars} size="2x" />}
        </button>
        <ul className={isNavExpanded ? 'nav-bar-links expanded' : 'nav-bar-links'} onClick={() => setIsNavExpanded(!isNavExpanded)}>
          {navLinks.map((navLink, index) => (
            <li key={index}>
              <Link className={pathname === navLink.path ? 'current-location' : ''} to={navLink.path}>
                {navLink.name}
              </Link>
            </li>
          ))}
          {/* Tutaj kontrolujemy wyświetlanie 'Login' lub 'Logout' */}
          {user ? (
            <li>
              <Link to="/logout ">Logout</Link>
              {/* <button onClick={handleLogout}>Logout</button> */}
            </li>
          ) : 
              <li>
                {/* <Link to="/login">Login</Link> */}
                 <Link to="/SignIn">Sign In</Link> 
              </li>  
          }
        </ul>
      </nav>
    </header>
  );
};
export default Header;