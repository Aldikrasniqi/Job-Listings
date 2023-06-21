import { ENDPOINTS, apiCall } from '../../Lib/EndpointApi';
import { useState } from 'react';
import ErrorAlert from '../Alerts/Alerts';
import { EMAIL_REGEX } from '../../Lib/Regex';

function ForgotPasswordForm({ onSuccess }) {
  const [errorMessages, setErrorMessages] = useState([]);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = [];

    if (!email) {
      errors.push('Email cannot be empty');
    }
    if (!EMAIL_REGEX.test(email)) {
      errors.push('Invalid email');
    }
    if (errors.length) {
      setErrorMessages(errors);
      return;
    }

    const data = {
      email,
    };
    const response = await apiCall(ENDPOINTS.forgotPasswordRequest, { data });
    console.log(response);
    if (response.confirmed) {
      setErrorMessages([]);
      onSuccess(response.results);
    } else {
      setErrorMessages(['Something went wrong!']);
    }
  };

  return (
    <>
      <ErrorAlert messages={errorMessages} />
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="w-8 h-8 mr-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
            Job Listings
          </a>
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Change Password
            </h2>
            <form
              className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex items-start"></div>
              <button
                type="submit"
                className="w-full dark:ring-offset-gray-800 bg-slate-800 text-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Reset password
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default ForgotPasswordForm;
