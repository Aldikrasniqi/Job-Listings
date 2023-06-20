import withLayouts from '../../HOC/withLayouts';
import RegisterForm from '../../Components/Forms/RegisterForm';
import { useState } from 'react';
const Register = () => {
  const [isRegistered, setIsRegistered] = useState(false);

  return (
    <>
      {isRegistered ? (
        <h1>Please Verify your account</h1>
      ) : (
        <RegisterForm
          setRegistered={() => {
            setIsRegistered(true);
          }}
        />
      )}
    </>
  );
};
export default withLayouts(Register);
