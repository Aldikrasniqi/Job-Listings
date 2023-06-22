import React, { useState, useEffect } from 'react';
import axios from 'axios';
import withLayouts from '../../HOC/withLayouts';

function Dashboard() {
  const jobs = ['Programmer', 'Designer', 'Developer', 'Engineer', 'Manager'];
  const [job, setJob] = useState(jobs[0]);
  const [searchResults, setSearchResults] = useState([]);
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    const apiEndpoint = 'http://localhost:4001/jobs/job-titles';
    axios
      .get(apiEndpoint)
      .then((response) => {
        console.log(response.data);
        const { company } = response.data;
        const titleArray = Object.values(company);
        setTitles(titleArray);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  // onChange handler for the search input
  const handleSearch = (e) => {
    const keyword = e.target.value;
    setJob(keyword);

    if (keyword.trim() === '') {
      setSearchResults([]); // Clear the search results if the input is empty
    } else {
      // Filter the jobs array based on the keyword
      const filteredResults = jobs.filter((job) =>
        job.toLowerCase().includes(keyword.toLowerCase())
      );
      setSearchResults(filteredResults);
    }
  };

  return (
    <div className="w-full mt-10">
      <h1 className="mb-12 font-sans text-2xl sm:text-4xl subpixel-antialiased font-semibold ml-4 md:ml-20 text-slate-800 tracking-wide">
        Find Your Dream Job Here
      </h1>
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
                    onClick={() => setJob(result)}
                  >
                    {result}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h2 className="mb-12 mt-12 font-sans text-2xl sm:text-4xl subpixel-antialiased font-semibold  text-slate-800 tracking-wide">
              Job Company Titles:
            </h2>
            <p>{titles.join('')}</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default withLayouts(Dashboard);
