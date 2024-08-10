import axios from "axios";
import { useEffect, useState } from "react";

function useFetchData(apiEndpoint) {
  const [alldata, setAlldata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allMovie,SetAllMovie]= useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(apiEndpoint);
        const allData = res.data;
        setAlldata(allData);
        SetAllMovie(allData)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (apiEndpoint) {
      fetchAllData();
    }
  }, [apiEndpoint]);

  return { alldata, loading, error,allMovie };
}

export default useFetchData;
