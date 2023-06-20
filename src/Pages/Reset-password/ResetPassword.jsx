import withLayouts from '../../HOC/withLayouts';

import ResetPasswordForm from '../../Components/Forms/ResetPasswordForm';
import { useState } from 'react';

function ResetPassword() {
  const [passwordReset, setPasswordReset] = useState(false);

  const handleSuccess = () => {
    setPasswordReset(true);
  };

  return (
    <>
      <h1>Register</h1>

      {passwordReset ? (
        <h3>Your password was successfully changed</h3>
      ) : (
        <ResetPasswordForm onSuccess={handleSuccess} />
      )}
    </>
  );
}
export default withLayouts(ResetPassword);
