import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import pages from './utils/pages';
import Home from './components/pages/Home';
import Bookings from './components/pages/Bookings';
import UnderConstruction from './components/pages/UnderConstruction';
import ConfirmedBooking from './components/pages/Bookings/ConfirmedBooking';
import NotFound from './components/pages/NotFound';
import AuthProvider from './context/hooks/AuthProvider';
import PrivateRoute from './components/pages/SignIn/PrivateRoute';
import Dashboard from './components/pages/SignIn/Dashboard';
import Logout from './components/pages/Logout/Logout';
import SignIn from './components/pages/SignIn/SignIn';
import SignUp from './components/pages/SignUp/SignUp';
import Order from './components/pages/OrderOnline/Order';
import CartPage from './components/pages/CartPage/CartPage';


function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path={pages.get('home').path} element={<Home />} />
          <Route path={pages.get('about').path} element={<UnderConstruction />} />
          <Route path={pages.get('menu').path} element={<UnderConstruction />} />
          <Route path={pages.get('bookings').path} element={<Bookings />} />
          <Route path={pages.get('confirmedBooking').path} element={<ConfirmedBooking />} />
          <Route path={pages.get('orderOnline').path} element={<Order />} />
          <Route path="/Cart" element={<CartPage /> } />
          <Route path="/SignIn" element={<SignIn /> } />
          <Route path="/SignUp" element={<SignUp />} />
          {/* <Route path="/login" element={<Login/>} /> */}
          <Route path="/logout" element={<Logout />} />
          {/* <Route path={pages.get('login').path} element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}

export default App;
