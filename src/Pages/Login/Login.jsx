import withLayouts from '../../HOC/withLayouts';
import LoginForm from '../../Components/Forms/LoginForm';
// import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../Store/Slice';

const Login = () => {
  const dispatch = useDispatch();
  const onLoginSuccess = (results) => {
    dispatch(login(results));
  };

  return (
    <>
      <LoginForm onSuccess={onLoginSuccess} />
      {/* <NavLink to="/forgot-password">Forgot Password</NavLink> */}
    </>
  );
};

export default withLayouts(Login);
