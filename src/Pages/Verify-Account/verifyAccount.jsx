import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ENDPOINTS, apiCall } from '../../Lib//EndpointApi';

function VerifyAccount() {
  const params = useParams();
  const [message, setMessage] = useState('');
  useEffect(() => {
    const verifyAccount = async () => {
      const endpoint = ENDPOINTS.verifyAccount;
      endpoint.url += '/' + params.token;
      const response = await apiCall(endpoint);
      if (response.confirm) {
        setMessage('Account was successfully verified');
      } else {
        setMessage('Something went wrong!');
      }
    };
    verifyAccount();
  }, [params]);

  return <div>{message}</div>;
}

export default VerifyAccount;
