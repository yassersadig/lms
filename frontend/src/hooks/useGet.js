import { useState, useEffect } from "react";
import axios from "axios";

const useGet = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async (url) => {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetch(url);
  }, [url]);

  return { data, loading, error };
};

export default useGet;
