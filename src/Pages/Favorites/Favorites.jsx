import React from 'react';
import { useSelector } from 'react-redux';
import withLayouts from '../../HOC/withLayouts';

function Favorites() {
  const auth = useSelector((state) => state.auth.value);
  return (
    <>
      {auth ? (
        <>
          <h1>Content auth</h1>
        </>
      ) : (
        <>
          <h1>non auth Content</h1>
        </>
      )}
    </>
  );
}
export default withLayouts(Favorites);
