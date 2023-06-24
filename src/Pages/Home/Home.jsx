import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import withLayouts from '../../HOC/withLayouts';

function Home() {
  const auth = useSelector((state) => state.auth.value);

  return (
    <>
      {auth ? (
        <>
          <div className="flex-grow">{JSON.stringify(auth)}</div>
          {/* Content to be displayed when the user is authenticated */}
          <p>Authenticated content</p>
          <p>Authenticated content</p>
          <p>Authenticated content</p>
          <p>Authenticated content</p>
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

export default withLayouts(Home);
