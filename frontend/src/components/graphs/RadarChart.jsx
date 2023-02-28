import React, { useRef } from "react";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";

const RadarChart = ({ userId }) => {
  const { data, loading, error } = useFetch(`${userId}/performance`);
  const svgRef = useRef();

  useEffect(() => {
    if (!data) {
      return;
    }
  }, [data]);

  return (
    <div
      className="mt-6 w-[30%] h-[200px] bg-[#282D30] rounded-md"
      id="radarchart"
    >
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default RadarChart;
