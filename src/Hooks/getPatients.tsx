import {useState, useEffect} from 'react';
import axios from 'axios';

export default function useGetPatients() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('https://63bedcf7f5cfc0949b634fc8.mockapi.io/users')
      .then((response: any) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err: any) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return {data, loading, error};
}
