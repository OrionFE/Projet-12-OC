import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const useFetch = (route) => {
  const URL = `http://localhost:3000/user/${route}`;
  const [data, setData] = useState(null);
  const [loading , setLoading] = useState(true)
  const [error , setError] = useState('')

  useEffect(() => {

    fetch(URL)
    .then(res => res.json())
    .then((data) => {
      setError(data.error)
      setData(data.data)
      setLoading(false)
    })
  }, [])
  
  return {data , loading, error}

};

export default useFetch;
