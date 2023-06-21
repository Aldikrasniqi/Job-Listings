import withLayouts from '../../HOC/withLayouts';
import RegisterForm from '../../Components/Forms/RegisterForm';
import { useState } from 'react';
const Register = () => {
  const [isRegistered, setIsRegistered] = useState(false);

  return (
    <>
      {isRegistered ? (
        <>
          <div
            class="mb-4 rounded-lg bg-green px-6 py-5 text-base text-success-700  h-96"
            role="alert"
          >
            <h4 class="mb-2 text-2xl font-medium leading-tight">Well done!</h4>
            <p class="mb-4">
              Verify your email account!<br></br> This example text is going to
              run a bit longer so that you can see how spacing within an alert
              works with this kind of content.
            </p>
            <hr class="border-success-600 opacity-30" />
            <p class="mb-0 mt-4">
              Whenever you need to, be sure to use margin utilities to keep
              things nice and tidy.
            </p>
          </div>
        </>
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
