import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PublicRoutes = ({ children }) => {
  const auth = useSelector((state) => state.auth.value);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(auth);
    console.log(auth);
    if (auth && auth.token) {
      navigate('/dashboard');
    }
  }, [auth, navigate]);

  return auth && auth.token ? null : children;
};

export default PublicRoutes;
