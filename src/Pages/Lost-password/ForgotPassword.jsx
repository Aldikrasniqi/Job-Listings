import withLayouts from '../../HOC/withLayouts';
import ForgotPasswordForm from '../../Components/Forms/ForgotPasswordForm';
import { useState } from 'react';
function ForgotPassword() {
  const [requestSend, setRequestSend] = useState(false);

  const handleSuccess = () => {
    setRequestSend(true);
  };
  return (
    <>
      <>
        {requestSend ? (
          <h2>An email was sent to you with further instructions!</h2>
        ) : (
          <ForgotPasswordForm onSuccess={handleSuccess} />
        )}
      </>
    </>
  );
}
export default withLayouts(ForgotPassword);
