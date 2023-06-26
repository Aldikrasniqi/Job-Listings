import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Header from '../../Layouts/Header';
import Footer from '../../Layouts/Footer';
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

        console.log(favoriteJobs);
        const favoriteJobsArray = Object.keys(response.data.results).map(
          (key) => {
            return {
              id: key,
              ...response.data.results[key],
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

  return (
    <>
      <Header />
      {auth ? (
        <>
          <h1>Content auth</h1>
          {favoriteJobs.map((job) => (
            <div key={job.id}>
              <p>Job ID: {job.id}</p>
              <p>Company: {job.companies}</p>
              <p>Job Expires: {job.jobListExpires}</p>
              <br />
              <br />
              {/* Add more properties as needed */}
            </div>
          ))}
        </>
      ) : (
        <h1>Content unauth</h1>
      )}
      <Footer />
    </>
  );
}

export default Favorites;
