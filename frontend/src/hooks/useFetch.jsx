import { useEffect } from "react";
import { useState } from "react";
import { mockApi } from "../utils/MockApi";
import PropTypes from "prop-types";

/**
 * Hook to get data from API or Mock
 * @param {string} route Choosen Endpoint for API
 * @param {string} mockRoute Choosen Endoint for Mock
 * @returns {{data: Object , loading: boolean , error: string}}
 */

const useFetch = (route, mockRoute) => {
  /**
   * @param useMock toogle for using mock
   */

  const useMock = true;

  const URL = `http://localhost:3000/user/${route}`;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const mockData = mockApi(mockRoute);

  useEffect(() => {
    if (useMock) {
      if (!mockData) {
        return;
      }
      setData(mockData?.data);
      setLoading(mockData?.loading);
      setError(mockData?.error);
    } else {
      fetch(URL)
        .then((res) => res.json())
        .then((data) => {
          setError(data.error);
          setData(data.data);
          setLoading(false);
        });
    }
  }, []);

  return { data, loading, error };
};

useFetch.propsType = {
  route: PropTypes.string.isRequired,
  mockRoute: PropTypes.string.isRequired,
};

export default useFetch;
