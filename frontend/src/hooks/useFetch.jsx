import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { mockApi } from "../utils/MockApi";

const useFetch = (route, mockRoute) => {
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

export default useFetch;
