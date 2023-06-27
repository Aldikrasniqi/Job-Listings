/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Header from '../../Layouts/Header';
import Footer from '../../Layouts/Footer';
import { Button } from 'flowbite-react';
import { HiOutlineArrowRight } from 'react-icons/hi';
function Favorites({ userId }) {
  const auth = useSelector((state) => state.auth.value);
  const [favoriteJobs, setFavoriteJobs] = useState([]);

  useEffect(() => {
    const fetchFavoriteJobs = async () => {
      try {
        const endPoint = `http://localhost:4001/dashboard/favorites`;
        const response = await axios.get(endPoint, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        console.log(response.data.favorites);

        const favoriteJobsArray = Object.keys(response.data.favorites).map(
          (key) => {
            return {
              id: key,
              ...response.data.favorites[key],
            };
          }
        );
        console.log(favoriteJobsArray);
        setFavoriteJobs(favoriteJobsArray);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFavoriteJobs();
  }, [userId, auth.token]);

  const handleDeletedFavorites = async (id) => {
    const endPoint = `http://localhost:4001/dashboard/favorites/${id}`;
    const response = await axios.delete(endPoint, {
      headers: {
        authorization: `Bearer ${auth.token}`,
      },
    });
    console.log(response.data);
    try {
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Header />
      {auth ? (
        <>
          <h1 className="m-10 font-sans text-2xl sm:text-5xl subpixel-antialiased font-extrabold ml-4 md:ml-10 text-slate-800 tracking-wide">
            User Favorites
          </h1>
          <ul role="list" className="divide-y divide-gray-100 m-20">
            {favoriteJobs.map((job) => (
              <li key={job.id} className="flex justify-between gap-x-6 py-5">
                <div className="flex gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-m font-semibold leading-6 text-gray-900">
                      User: {auth.user.firstName}
                      {console.log(job._id)}
                    </p>
                    <p className="text-m font-semibold leading-6 text-gray-900">
                      Job tittle: {job.companies}
                    </p>

                    <p className="mt-1 truncate text-s leading-5 text-gray-500">
                      Job expires: {job.jobListExpires}
                    </p>
                    <Button
                      size="xs"
                      className="mt-4 bg-red-900 hover:bg-red-950"
                      onClick={() => handleDeletedFavorites(job.id)}
                    >
                      Delete from favorites
                      <HiOutlineArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <h1>Content unauth</h1>
      )}
      <Footer />
    </>
  );
}

export default Favorites;
