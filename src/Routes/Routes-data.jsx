import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import ForgotPassword from '../Pages/Lost-password/ForgotPassword';
import Home from '../Pages/Home/Home';
import VerifyAccount from '../Pages/Verify-Account/verifyAccount';
import ResetPassword from '../Pages/Reset-password/ResetPassword';
import Dashboard from '../Pages/Dashboard/Dashboard';
import About from '../Pages/About/About';
import Docs from '../Pages/Documentation/Docs';
import NotFound from '../Pages/NotFound/NotFound';
import Favorites from '../Pages/Favorites/Favorites';
export const publicRoutes = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/reset-password/:token',
    element: <ResetPassword />,
  },
  {
    path: '/verify-account/:token',
    element: <VerifyAccount />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/docs',
    element: <Docs />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export const privateRoutes = [
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/Favorites',
    element: <Favorites />,
  },
];

export const exposedRoutes = [
  {
    path: '/',
    element: <Home />,
  },
];
