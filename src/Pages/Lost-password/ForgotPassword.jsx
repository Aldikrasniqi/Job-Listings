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
      {requestSend ? (
        <>
          <div
            class="mb-4 rounded-lg bg-green px-6 py-5 text-base text-success-700  h-96"
            role="alert"
          >
            <h4 class="mb-2 text-2xl font-medium leading-tight">Well done!</h4>
            <p class="mb-4">
              An email was sent to you with further instructions!<br></br> This
              example text is going to run a bit longer so that you can see how
              spacing within an alert works with this kind of content.
            </p>
            <hr class="border-success-600 opacity-30" />
            <p class="mb-0 mt-4">
              Whenever you need to, be sure to use margin utilities to keep
              things nice and tidy.
            </p>
          </div>
        </>
      ) : (
        <ForgotPasswordForm onSuccess={handleSuccess} />
      )}
    </>
  );
}

export default withLayouts(ForgotPassword);
