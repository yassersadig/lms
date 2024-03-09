import { useState, useEffect } from "react";
import axios from "axios";

const useGet = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async (url) => {
      try {
        setLoading(true);
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        setError("Something went wrong...");
      } finally {
        setLoading(false);
      }
    };
    fetch(url);
  }, [url]);

  return { data, loading, error };
};

export default useGet;
