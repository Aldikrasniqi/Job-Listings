'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import withLayouts from '../../HOC/withLayouts';
import { Link } from 'react-router-dom';
import { Rating } from 'flowbite-react';
import { Pagination } from 'flowbite-react';
import { useSelector } from 'react-redux';
function Dashboard() {
  const auth = useSelector((state) => state.auth.value);
  const jobs = ['Programmer', 'Designer', 'Developer', 'Engineer', 'Manager'];
  const [currentPage, setCurrentPage] = useState(1);
  const [job, setJob] = useState(jobs[0]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [kosovaJobs, setKosovaJobs] = useState([]); // Data state
  const [city, setCity] = useState([]);
  const [jobExpires, setJobExpires] = useState([]);
  const [favorites, setFavorites] = useState([]); // Favorites state

  useEffect(() => {
    const apiEndpoint = 'http://localhost:4001/jobs/kosova-jobs';
    axios
      .get(apiEndpoint)
      .then((response) => {
        console.log(response.data);
        const linkTextsArray = Object.values(response.data.linkTexts);
        setKosovaJobs(linkTextsArray);
        console.log(typeof linkTextsArray);
        setCity(response.data.cityTexts);
        setJobExpires(response.data.jobListExpiresTexts);
        setIsLoading(false); // Fetching completed, set loading state to false
      })
      .catch((error) => {
        console.error('Error:', error);
        setIsLoading(false); // Fetching completed with error, set loading state to false
      });
  }, []);

  // onChange handler for the search input
  const handleSearch = (e) => {
    const keyword = e.target.value;
    setJob(keyword);

    if (keyword.trim() === '') {
      setSearchResults([]);
    } else {
      const filteredResults = kosovaJobs.filter((job) =>
        job.toLowerCase().includes(keyword.toLowerCase())
      );
      setSearchResults(filteredResults);
    }
  };

  const handleResultClick = (result) => {
    setJob(result);
    setSearchResults([]);
  };
  const handleAddToFavorites = async (id) => {
    // stop rendering the page after clicking the button

    try {
      const apiEndpoint = `http://localhost:4001/dashboard/favorites/${id}`;

      // Make a POST request to the backend API endpoint
      const response = await axios.post(
        apiEndpoint,
        {
          data: 'added to favorites',
        },
        {
          headers: {
            authorization: `Bearer ${auth.token}`,
          },
        }
      );

      // Extract the added favorite from the response
      const { favorite } = response.data;
      console.log(favorite);

      // Update your favorites list without rendering the entire page
      setFavorites((prevFavorites) => [...prevFavorites, favorite]); // Append the new favorite to the existing list
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };

  return (
    <>
      {auth ? (
        <>
          <div className="w-full mt-10">
            <h1 className="mb-12 font-sans text-2xl sm:text-5xl subpixel-antialiased font-extrabold ml-4 md:ml-20 text-slate-800 tracking-wide">
              Find Your Dream Job Here
            </h1>
            {console.log(auth.token)}
            <div className="flex justify-center">
              <form className="w-5/6">
                <label
                  htmlFor="default-search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search Jobs, title, or keyword..."
                    onChange={handleSearch}
                    value={job}
                    required
                  />
                  <button
                    type="submit"
                    className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Search
                  </button>
                </div>

                {searchResults.length > 0 && (
                  <div className="mt-4">
                    <ul className="bg-white border border-gray-300 rounded-lg shadow-md">
                      {searchResults.map((result, index) => (
                        <li
                          key={index}
                          className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleResultClick(result)}
                        >
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {isLoading ? (
                  <button
                    disabled
                    type="button"
                    class="py-2.5 px-5 mr-2 mt-10 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
                  >
                    <svg
                      aria-hidden="true"
                      role="status"
                      class="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="#1C64F2"
                      />
                    </svg>
                    Loading...
                  </button>
                ) : (
                  <>
                    <div id="defaultTabContent" className="flex justify-center">
                      <div
                        className="p-4 bg-slate-800 mt-10 rounded-lg md:p-5 dark:bg-gray-800 w-11/12"
                        id="about"
                        role="tabpanel"
                        aria-labelledby="about-tab"
                      >
                        {/* Data display */}
                        <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-white dark:text-white">
                          {kosovaJobs.length > 0 && kosovaJobs[0]}
                        </h2>
                        <p className="mb-3 text-gray-100 dark:text-gray-400">
                          {city.length > 0 && city[0]}
                        </p>
                        <p className="mb-3 text-gray-100 dark:text-gray-400">
                          {jobExpires.length > 0 && jobExpires[0]}
                        </p>

                        <button
                          className="inline-flex items-center font-medium text-blue-600 hover:text-gray-200 dark:text-blue-500 dark:hover:text-blue-700 mb-2"
                          onClick={() => handleAddToFavorites(0)}
                        >
                          Add to favorites
                        </button>

                        <Rating>
                          <Rating.Star />
                          <Rating.Star />
                          <Rating.Star />
                        </Rating>
                      </div>
                    </div>
                    <div id="defaultTabContent" className="flex justify-center">
                      <div
                        className="p-4 bg-slate-800 mt-10 rounded-lg md:p-5 dark:bg-gray-800 w-11/12 "
                        id="about"
                        role="tabpanel"
                        aria-labelledby="about-tab"
                      >
                        {/* Data display */}
                        <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-white dark:text-white ">
                          {kosovaJobs.length > 0 && kosovaJobs[1]}
                        </h2>
                        <p className="mb-3 text-gray-100 dark:text-gray-400">
                          {city.length > 0 && city[1]}
                        </p>
                        <p className="mb-3 text-gray-100 dark:text-gray-400">
                          {jobExpires.length > 0 && jobExpires[1]}
                        </p>

                        <button
                          className="inline-flex items-center font-medium text-blue-600 hover:text-gray-200 dark:text-blue-500 dark:hover:text-blue-700 mb-2"
                          onClick={() => handleAddToFavorites(1)}
                        >
                          Add to favorites
                        </button>

                        <Rating>
                          <Rating.Star />
                          <Rating.Star />
                          <Rating.Star />
                          <Rating.Star />
                          <Rating.Star />
                        </Rating>
                      </div>
                    </div>
                    <div id="defaultTabContent" className="flex justify-center">
                      <div
                        className="p-4 bg-slate-800 mt-10 rounded-lg md:p-5 dark:bg-gray-800 w-11/12 "
                        id="about"
                        role="tabpanel"
                        aria-labelledby="about-tab"
                      >
                        {/* Data display */}
                        <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-white dark:text-white">
                          {kosovaJobs.length > 0 && kosovaJobs[2]}
                        </h2>
                        <p className="mb-3 text-gray-200 dark:text-gray-400">
                          {city.length > 0 && city[2]}
                        </p>
                        <p className="mb-3 text-gray-200 dark:text-gray-400">
                          {jobExpires.length > 0 && jobExpires[2]}
                        </p>
                        <button
                          className="inline-flex items-center font-medium text-blue-600 hover:text-gray-200 dark:text-blue-500 dark:hover:text-blue-700 mb-2"
                          onClick={() => handleAddToFavorites(2)}
                        >
                          Add to favorites
                        </button>
                        <Rating>
                          <Rating.Star />
                          <Rating.Star />
                          <Rating.Star />
                          <Rating.Star />
                          <Rating.Star />
                        </Rating>
                      </div>
                    </div>
                    <div id="defaultTabContent" className="flex justify-center">
                      <div
                        className="p-4 bg-slate-800 mt-10 rounded-lg md:p-5 dark:bg-gray-800 w-11/12"
                        id="about"
                        role="tabpanel"
                        aria-labelledby="about-tab"
                      >
                        {/* Data display */}
                        <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-white dark:text-white">
                          {kosovaJobs.length > 0 && kosovaJobs[3]}
                        </h2>
                        <p className="mb-3 text-gray-200 dark:text-gray-400">
                          {city.length > 0 && city[3]}
                        </p>
                        <p className="mb-3 text-gray-200 dark:text-gray-400">
                          {jobExpires.length > 0 && jobExpires[3]}
                        </p>
                        <button
                          className="inline-flex items-center font-medium text-blue-600 hover:text-gray-200 dark:text-blue-500 dark:hover:text-blue-700 mb-2"
                          onClick={() => handleAddToFavorites(3)}
                        >
                          Add to favorites
                        </button>
                        <Rating>
                          <Rating.Star />
                          <Rating.Star />
                          <Rating.Star />
                          <Rating.Star />
                          <Rating.Star />
                        </Rating>
                      </div>
                    </div>
                    <div id="defaultTabContent" className="flex justify-center">
                      <div
                        className="p-4 bg-slate-800 mt-10 rounded-lg md:p-5 dark:bg-gray-800 w-11/12"
                        id="about"
                        role="tabpanel"
                        aria-labelledby="about-tab"
                      >
                        {/* Data display */}
                        <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-white dark:text-white">
                          {kosovaJobs.length > 0 && kosovaJobs[4]}
                        </h2>
                        <p className="mb-3 text-gray-200 dark:text-gray-400">
                          {city.length > 0 && city[4]}
                        </p>
                        <p className="mb-3 text-gray-200 dark:text-gray-400">
                          {jobExpires.length > 0 && jobExpires[4]}
                        </p>
                        <button
                          className="inline-flex items-center font-medium text-blue-600 hover:text-gray-200 dark:text-blue-500 dark:hover:text-blue-700 mb-2"
                          onClick={() => handleAddToFavorites(4)}
                        >
                          Add to favorites
                        </button>

                        <Rating>
                          <Rating.Star />
                          <Rating.Star />
                          <Rating.Star />
                          <Rating.Star />
                          <Rating.Star />
                        </Rating>
                      </div>
                    </div>
                    <div id="defaultTabContent" className="flex justify-center">
                      <div
                        className="p-4 bg-slate-800 mt-10 mb-10 rounded-lg md:p-5 dark:bg-gray-800 w-11/12"
                        id="about"
                        role="tabpanel"
                        aria-labelledby="about-tab"
                      >
                        {/* Data display */}
                        <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-white dark:text-white">
                          {kosovaJobs.length > 0 && kosovaJobs[5]}
                        </h2>
                        <p className="mb-3 text-gray-200 dark:text-gray-400">
                          {city.length > 0 && city[5]}
                        </p>
                        <p className="mb-3 text-gray-200 dark:text-gray-400">
                          {jobExpires.length > 0 && jobExpires[5]}
                        </p>
                        <button
                          className="inline-flex items-center font-medium text-blue-600 hover:text-gray-200 dark:text-blue-500 dark:hover:text-blue-700 mb-2"
                          onClick={() => handleAddToFavorites(5)}
                        >
                          Add to favorites
                        </button>
                        <Rating>
                          <Rating.Star />
                          <Rating.Star />
                          <Rating.Star />
                          <Rating.Star />
                        </Rating>
                      </div>
                    </div>
                    <div className="flex items-center justify-center text-center">
                      <Pagination
                        currentPage={3}
                        layout="table"
                        onPageChange={(page) => {
                          setCurrentPage(page);
                        }}
                        showIcons
                        totalPages={1000}
                      />
                    </div>

                    <Rating className="mb-2 mt-10">
                      <Rating.Star />
                      <Rating.Star />
                      <Rating.Star />
                      <Rating.Star />
                      <Rating.Star />
                      <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                        4.95 out of 5
                      </p>
                    </Rating>
                    <p className="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                      1,745 global ratings
                    </p>
                    <Rating.Advanced className="mb-2" percentFilled={70}>
                      <p>5 star</p>
                    </Rating.Advanced>
                    <Rating.Advanced className="mb-2" percentFilled={17}>
                      <p>4 star</p>
                    </Rating.Advanced>
                    <Rating.Advanced className="mb-2" percentFilled={8}>
                      <p>3 star</p>
                    </Rating.Advanced>
                    <Rating.Advanced className="mb-2" percentFilled={4}>
                      <p>2 star</p>
                    </Rating.Advanced>
                    <Rating.Advanced percentFilled={1} className="mb-10">
                      1 star
                    </Rating.Advanced>
                  </>
                )}
              </form>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Content to be displayed when the user is not authenticated */}
          <p>Please log in to view the content</p>
          <Link to="/login">Login</Link>
        </>
      )}
    </>
  );
}

export default withLayouts(Dashboard);
