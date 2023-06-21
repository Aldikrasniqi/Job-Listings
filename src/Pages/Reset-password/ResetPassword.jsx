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
      {passwordReset ? (
        <div
          class="mb-4 rounded-lg bg-green px-6 py-5 text-base text-success-700  h-96"
          role="alert"
        >
          <h4 class="mb-2 text-2xl font-medium leading-tight">Well done!</h4>
          <p class="mb-4">
            Your password has been successfully reseted. This example text is
            going to run a bit longer so that you can see how spacing within an
            alert works with this kind of content.
          </p>
          <hr class="border-success-600 opacity-30" />
          <p class="mb-0 mt-4">
            Whenever you need to, be sure to use margin utilities to keep things
            nice and tidy.
          </p>
        </div>
      ) : (
        <ResetPasswordForm onSuccess={handleSuccess} />
      )}
    </>
  );
}
export default withLayouts(ResetPassword);
