import React, { useState } from 'react';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../Lib/Regex';
import { ENDPOINTS, apiCall } from '../../Lib/EndpointApi';
import ErrorAlert from '../Alerts/Alerts';
import { Link } from 'react-router-dom';
function RegisterForm({ setRegistered }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = [];

    if (!firstName) {
      errors.push('First Name cannot be empty');
    }
    if (!lastName) {
      errors.push('Last Name cannot be empty');
    }
    if (!email) {
      errors.push('Email cannot be empty');
    }
    if (!EMAIL_REGEX.test(email)) {
      errors.push('Invalid email');
    }
    if (!password) {
      errors.push('Password cannot be empty');
    }
    if (!PASSWORD_REGEX.test(password)) {
      errors.push(
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      );
    }
    if (password !== confirmPassword) {
      errors.push('Passwords do not match');
    }
    if (errors.length) {
      setErrorMessages(errors);
      return;
    }

    const data = {
      firstName,
      lastName,
      email,
      password,
    };
    const response = await apiCall(ENDPOINTS.register, { data });
    console.log(response);
    if (response.confirmed) {
      setErrorMessages([]);
      setRegistered(response.results);
      // reseting the form state
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } else {
      setErrorMessages(['Something Went wrong!']);
    }
  };

  return (
    <>
      <ErrorAlert messages={errorMessages} />
      <section className=" dark:bg-gray-900">
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
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      placeholder="Your first name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={lastName}
                      placeholder="Your last name"
                      onChange={(e) => setLastName(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                </div>
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="flex items-start">
                  {/* Terms and conditions checkbox */}
                </div>
                <button
                  type="submit"
                  className="w-full bg-slate-800 dark:ring-offset-gray-800 text-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
                  </Link>
                </p>
                <div class="inline-flex rounded-md shadow-sm mt-5" role="group">
                  <button
                    type="button"
                    class="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-2 mb-2"
                  >
                    <svg
                      class="w-5 h-5 mr-2 -ml-1"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fab"
                      data-icon="apple"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                    >
                      <path
                        fill="currentColor"
                        d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
                      ></path>
                    </svg>
                    Sign up with Apple
                  </button>
                  <button
                    type="button"
                    class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2"
                  >
                    <svg
                      aria-hidden="true"
                      class="w-6 h-5 mr-2 -ml-1"
                      viewBox="0 0 2405 2501"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {' '}
                      <g clip-path="url(#clip0_1512_1323)">
                        {' '}
                        <path
                          d="M2278.79 1730.86L2133.62 2221.69L1848.64 2143.76L2278.79 1730.86Z"
                          fill="#E4761B"
                          stroke="#E4761B"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M1848.64 2143.76L2123.51 1767.15L2278.79 1730.86L1848.64 2143.76Z"
                          fill="#E4761B"
                          stroke="#E4761B"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M2065.2 1360.79L2278.79 1730.86L2123.51 1767.15L2065.2 1360.79ZM2065.2 1360.79L2202.64 1265.6L2278.79 1730.86L2065.2 1360.79Z"
                          fill="#F6851B"
                          stroke="#F6851B"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M1890.29 1081.17L2285.34 919.338L2265.7 1007.99L1890.29 1081.17ZM2253.21 1114.48L1890.29 1081.17L2265.7 1007.99L2253.21 1114.48Z"
                          fill="#763D16"
                          stroke="#763D16"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M2253.21 1114.48L2202.64 1265.6L1890.29 1081.17L2253.21 1114.48ZM2332.34 956.82L2265.7 1007.99L2285.34 919.338L2332.34 956.82ZM2253.21 1114.48L2265.7 1007.99L2318.65 1052.01L2253.21 1114.48Z"
                          fill="#763D16"
                          stroke="#763D16"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M1542.24 2024.17L1641 2055.7L1848.64 2143.75L1542.24 2024.17Z"
                          fill="#E2761B"
                          stroke="#E2761B"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M2202.64 1265.6L2253.21 1114.48L2296.64 1147.8L2202.64 1265.6ZM2202.64 1265.6L1792.71 1130.55L1890.29 1081.17L2202.64 1265.6Z"
                          fill="#763D16"
                          stroke="#763D16"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M1987.86 617.696L1890.29 1081.17L1792.71 1130.55L1987.86 617.696Z"
                          fill="#763D16"
                          stroke="#763D16"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M2285.34 919.338L1890.29 1081.17L1987.86 617.696L2285.34 919.338Z"
                          fill="#763D16"
                          stroke="#763D16"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M1987.86 617.696L2400.16 570.1L2285.34 919.338L1987.86 617.696Z"
                          fill="#763D16"
                          stroke="#763D16"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M2202.64 1265.6L2065.2 1360.79L1792.71 1130.55L2202.64 1265.6Z"
                          fill="#F6851B"
                          stroke="#F6851B"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M2382.31 236.33L2400.16 570.1L1987.86 617.696L2382.31 236.33Z"
                          fill="#763D16"
                          stroke="#763D16"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M2382.31 236.33L1558.3 835.45L1547.59 429.095L2382.31 236.33Z"
                          fill="#E2761B"
                          stroke="#E2761B"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M934.789 380.309L1547.59 429.095L1558.3 835.449L934.789 380.309Z"
                          fill="#F6851B"
                          stroke="#F6851B"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M1792.71 1130.55L1558.3 835.449L1987.86 617.696L1792.71 1130.55Z"
                          fill="#763D16"
                          stroke="#763D16"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M1792.71 1130.55L2065.2 1360.79L1682.65 1403.04L1792.71 1130.55Z"
                          fill="#E4761B"
                          stroke="#E4761B"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M1682.65 1403.04L1558.3 835.449L1792.71 1130.55L1682.65 1403.04Z"
                          fill="#E4761B"
                          stroke="#E4761B"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M1987.86 617.696L1558.3 835.45L2382.31 236.33L1987.86 617.696Z"
                          fill="#763D16"
                          stroke="#763D16"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M940.144 2134.24L1134.69 2337.11L869.939 2096.16L940.144 2134.24Z"
                          fill="#C0AD9E"
                          stroke="#C0AD9E"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M1848.64 2143.75L1940.86 1793.33L2123.51 1767.15L1848.64 2143.75Z"
                          fill="#CD6116"
                          stroke="#CD6116"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M151.234 1157.92L487.978 803.917L194.666 1115.67L151.234 1157.92Z"
                          fill="#E2761B"
                          stroke="#E2761B"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M2123.51 1767.15L1940.86 1793.33L2065.2 1360.79L2123.51 1767.15ZM1558.3 835.449L1230.48 824.74L934.789 380.309L1558.3 835.449Z"
                          fill="#F6851B"
                          stroke="#F6851B"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M2065.2 1360.79L1940.86 1793.33L1930.74 1582.12L2065.2 1360.79Z"
                          fill="#E4751F"
                          stroke="#E4751F"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M1682.65 1403.04L2065.2 1360.79L1930.74 1582.12L1682.65 1403.04Z"
                          fill="#CD6116"
                          stroke="#CD6116"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M1230.48 824.74L1558.3 835.449L1682.65 1403.04L1230.48 824.74Z"
                          fill="#F6851B"
                          stroke="#F6851B"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M1230.48 824.74L345.784 6.08252L934.79 380.309L1230.48 824.74ZM934.195 2258.58L165.513 2496.56L12.0146 1910.53L934.195 2258.58Z"
                          fill="#E4761B"
                          stroke="#E4761B"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M265.465 1304.27L555.803 1076.41L799.14 1132.93L265.465 1304.27Z"
                          fill="#763D16"
                          stroke="#763D16"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M799.139 1132.93L555.803 1076.41L686.098 538.567L799.139 1132.93Z"
                          fill="#763D16"
                          stroke="#763D16"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M194.666 1115.67L555.803 1076.41L265.465 1304.27L194.666 1115.67Z"
                          fill="#763D16"
                          stroke="#763D16"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M1930.74 1582.12L1780.81 1506.56L1682.65 1403.04L1930.74 1582.12Z"
                          fill="#CD6116"
                          stroke="#CD6116"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M194.666 1115.67L169.083 980.618L555.803 1076.41L194.666 1115.67Z"
                          fill="#763D16"
                          stroke="#763D16"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M1749.88 1676.72L1780.81 1506.56L1930.74 1582.12L1749.88 1676.72Z"
                          fill="#233447"
                          stroke="#233447"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M1940.86 1793.33L1749.88 1676.72L1930.74 1582.12L1940.86 1793.33Z"
                          fill="#F6851B"
                          stroke="#F6851B"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M555.803 1076.41L169.082 980.618L137.55 866.982L555.803 1076.41ZM686.098 538.567L555.803 1076.41L137.55 866.982L686.098 538.567ZM686.098 538.567L1230.48 824.74L799.139 1132.93L686.098 538.567Z"
                          fill="#763D16"
                          stroke="#763D16"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M799.14 1132.93L1230.48 824.74L1422.65 1411.96L799.14 1132.93ZM1422.65 1411.96L826.508 1399.47L799.14 1132.93L1422.65 1411.96Z"
                          fill="#E4761B"
                          stroke="#E4761B"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M265.465 1304.27L799.14 1132.93L826.508 1399.47L265.465 1304.27ZM1682.65 1403.04L1422.65 1411.96L1230.48 824.74L1682.65 1403.04Z"
                          fill="#F6851B"
                          stroke="#F6851B"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M1780.81 1506.56L1749.88 1676.72L1682.65 1403.04L1780.81 1506.56Z"
                          fill="#CD6116"
                          stroke="#CD6116"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M345.784 6.08252L1230.48 824.74L686.098 538.567L345.784 6.08252Z"
                          fill="#763D16"
                          stroke="#763D16"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M12.0146 1910.53L758.088 1879.59L934.195 2258.58L12.0146 1910.53Z"
                          fill="#E4761B"
                          stroke="#E4761B"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M934.194 2258.58L758.088 1879.59L1124.58 1861.75L934.194 2258.58Z"
                          fill="#CD6116"
                          stroke="#CD6116"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M1749.88 1676.72L1940.86 1793.33L2046.16 2041.42L1749.88 1676.72ZM826.508 1399.47L12.0146 1910.53L265.465 1304.27L826.508 1399.47ZM758.088 1879.59L12.0146 1910.53L826.508 1399.47L758.088 1879.59ZM1682.65 1403.04L1731.43 1580.33L1495.83 1594.02L1682.65 1403.04ZM1495.83 1594.02L1422.65 1411.96L1682.65 1403.04L1495.83 1594.02Z"
                          fill="#F6851B"
                          stroke="#F6851B"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M1134.69 2337.11L934.194 2258.58L1631.48 2375.79L1134.69 2337.11Z"
                          fill="#C0AD9E"
                          stroke="#C0AD9E"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M265.465 1304.27L151.234 1157.91L194.666 1115.67L265.465 1304.27Z"
                          fill="#763D16"
                          stroke="#763D16"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M1710.61 2288.92L1631.48 2375.79L934.194 2258.58L1710.61 2288.92Z"
                          fill="#D7C1B3"
                          stroke="#D7C1B3"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M1748.09 2075.93L934.194 2258.58L1124.58 1861.75L1748.09 2075.93Z"
                          fill="#E4761B"
                          stroke="#E4761B"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M934.194 2258.58L1748.09 2075.93L1710.61 2288.92L934.194 2258.58Z"
                          fill="#D7C1B3"
                          stroke="#D7C1B3"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M137.55 866.982L110.777 409.462L686.098 538.567L137.55 866.982ZM194.665 1115.67L115.536 1035.35L169.082 980.618L194.665 1115.67Z"
                          fill="#763D16"
                          stroke="#763D16"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M1289.38 1529.76L1422.65 1411.96L1403.61 1699.92L1289.38 1529.76Z"
                          fill="#CD6116"
                          stroke="#CD6116"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M1422.65 1411.96L1289.38 1529.76L1095.43 1630.31L1422.65 1411.96Z"
                          fill="#CD6116"
                          stroke="#CD6116"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M2046.16 2041.42L2009.87 2014.65L1749.88 1676.72L2046.16 2041.42Z"
                          fill="#F6851B"
                          stroke="#F6851B"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M1095.43 1630.31L826.508 1399.47L1422.65 1411.96L1095.43 1630.31Z"
                          fill="#CD6116"
                          stroke="#CD6116"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M1403.61 1699.92L1422.65 1411.96L1495.83 1594.02L1403.61 1699.92Z"
                          fill="#E4751F"
                          stroke="#E4751F"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M89.3589 912.199L137.55 866.982L169.083 980.618L89.3589 912.199Z"
                          fill="#763D16"
                          stroke="#763D16"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M1403.61 1699.92L1095.43 1630.31L1289.38 1529.76L1403.61 1699.92Z"
                          fill="#233447"
                          stroke="#233447"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M686.098 538.567L110.777 409.462L345.784 6.08252L686.098 538.567Z"
                          fill="#763D16"
                          stroke="#763D16"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M1631.48 2375.79L1664.2 2465.03L1134.69 2337.12L1631.48 2375.79Z"
                          fill="#C0AD9E"
                          stroke="#C0AD9E"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M1124.58 1861.75L1095.43 1630.31L1403.61 1699.92L1124.58 1861.75Z"
                          fill="#F6851B"
                          stroke="#F6851B"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M826.508 1399.47L1095.43 1630.31L1124.58 1861.75L826.508 1399.47Z"
                          fill="#E4751F"
                          stroke="#E4751F"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M1495.83 1594.02L1731.43 1580.33L2009.87 2014.65L1495.83 1594.02ZM826.508 1399.47L1124.58 1861.75L758.088 1879.59L826.508 1399.47Z"
                          fill="#F6851B"
                          stroke="#F6851B"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M1495.83 1594.02L1788.55 2039.64L1403.61 1699.92L1495.83 1594.02Z"
                          fill="#E4751F"
                          stroke="#E4751F"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M1403.61 1699.92L1788.55 2039.64L1748.09 2075.93L1403.61 1699.92Z"
                          fill="#F6851B"
                          stroke="#F6851B"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M1748.09 2075.93L1124.58 1861.75L1403.61 1699.92L1748.09 2075.93ZM2009.87 2014.65L1788.55 2039.64L1495.83 1594.02L2009.87 2014.65Z"
                          fill="#F6851B"
                          stroke="#F6851B"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M2068.18 2224.07L1972.99 2415.05L1664.2 2465.03L2068.18 2224.07ZM1664.2 2465.03L1631.48 2375.79L1710.61 2288.92L1664.2 2465.03Z"
                          fill="#C0AD9E"
                          stroke="#C0AD9E"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M1710.61 2288.92L1768.92 2265.72L1664.2 2465.03L1710.61 2288.92ZM1664.2 2465.03L1768.92 2265.72L2068.18 2224.07L1664.2 2465.03Z"
                          fill="#C0AD9E"
                          stroke="#C0AD9E"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M2009.87 2014.65L2083.05 2059.27L1860.54 2086.04L2009.87 2014.65Z"
                          fill="#161616"
                          stroke="#161616"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M1860.54 2086.04L1788.55 2039.64L2009.87 2014.65L1860.54 2086.04ZM1834.96 2121.15L2105.66 2088.42L2068.18 2224.07L1834.96 2121.15Z"
                          fill="#161616"
                          stroke="#161616"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M2068.18 2224.07L1768.92 2265.72L1834.96 2121.15L2068.18 2224.07ZM1768.92 2265.72L1710.61 2288.92L1748.09 2075.93L1768.92 2265.72ZM1748.09 2075.93L1788.55 2039.64L1860.54 2086.04L1748.09 2075.93ZM2083.05 2059.27L2105.66 2088.42L1834.96 2121.15L2083.05 2059.27Z"
                          fill="#161616"
                          stroke="#161616"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M1834.96 2121.15L1860.54 2086.04L2083.05 2059.27L1834.96 2121.15ZM1748.09 2075.93L1834.96 2121.15L1768.92 2265.72L1748.09 2075.93Z"
                          fill="#161616"
                          stroke="#161616"
                          stroke-width="5.94955"
                        />{' '}
                        <path
                          d="M1860.54 2086.04L1834.96 2121.15L1748.09 2075.93L1860.54 2086.04Z"
                          fill="#161616"
                          stroke="#161616"
                          stroke-width="5.94955"
                        />{' '}
                      </g>{' '}
                      <defs>
                        {' '}
                        <clipPath id="clip0_1512_1323">
                          {' '}
                          <rect
                            width="2404"
                            height="2500"
                            fill="white"
                            transform="translate(0.519043 0.132812)"
                          />{' '}
                        </clipPath>{' '}
                      </defs>{' '}
                    </svg>
                    Connect with MetaMask
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default RegisterForm;
