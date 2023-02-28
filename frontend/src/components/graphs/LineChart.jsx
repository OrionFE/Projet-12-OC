import React, { useRef } from "react";
import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";

const LineChart = ({ userId }) => {
  // @ts-ignore
  const { data, loading, error } = useFetch(`${userId}/average-sessions`);
  const svgRef = useRef();

  useEffect(() => {
    if (!data) {
      return;
    }
    const dataGraph = data.sessions;
  }, [data]);

  return (
    <div
      className="mt-6 w-[30%] h-[200px] bg-[#FF0000] rounded-md"
      id="linechart"
    >
      <h4 className="text-white/60 absolute text-xs w-36 mt-6 ml-6">
        Durée moyennes des sessions
      </h4>
      <svg ref={svgRef}>
        <g className="line"></g>
      </svg>
    </div>
  );
};

export default LineChart;
