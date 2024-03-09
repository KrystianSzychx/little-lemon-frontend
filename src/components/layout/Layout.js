import Header from './Header';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const { pathname } = useLocation();

  // Sprawdza, czy aktualna ścieżka to "/SignUp" lub "/SignIn"
  const isSignUpOrSignInPage = pathname === "/SignUp" || pathname === "/SignIn";

  return (
    <>
      {!isSignUpOrSignInPage && <Header />} 
      <main>{children}</main>
      {!isSignUpOrSignInPage && <Footer />}  
    </>
  );
};

export default Layout;