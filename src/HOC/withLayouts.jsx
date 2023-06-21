import Header from '../Layouts/Header';
import Footer from '../Layouts/Footer';

const withLayouts = (Component, data = 'public') => {
  return (props) => {
    return (
      <>
        {data === 'auth' ? <h1>AuthLogin</h1> : <Header />}

        <Component {...props} />

        <Footer />
      </>
    );
  };
};
export default withLayouts;
