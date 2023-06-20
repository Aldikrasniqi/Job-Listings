import withLayouts from '../../HOC/withLayouts';
import { useSelector } from 'react-redux';

function Home() {
  const auth = useSelector((state) => state.auth.value);

  return <div>{JSON.stringify(auth)}</div>;
}

export default withLayouts(Home);
