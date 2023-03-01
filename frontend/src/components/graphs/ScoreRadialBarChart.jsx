import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import useFetch from "../../hooks/useFetch";
import PropTypes from "prop-types";

/**
 * @component
 * Component for the activity chart
 * @param {Object} props
 * @param {string} props.userId
 * @returns {JSX.Element}
 */
const ScoreRadialBarChart = ({ userId }) => {
  const { data, loading, error } = useFetch(`${userId}`, "user");

  if (error) {
    return <p>Une erreur est survenu ({error})</p>;
  }

  if (loading) {
    return <p>Chargement ...</p>;
  }

  /**
   * dataGraph have 2 value :
   * - first one is a red draw circle to reflect the data
   * - second one is a transparent circle for the piechart to work
   */

  const dataGraph = [
    { value: data.todayScore },
    { value: 1 - data.todayScore },
  ];

  return (
    <div className="mt-6 w-[30%] h-[200px] bg-primaryBg rounded-md relative flex flex-col justify-center">
      <h3 className="text-[#20253A] text-sm  absolute top-[10px] left-[10px]">
        Score
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <circle fill="white" cy="50%" cx="50%" r="70" />
          <Pie
            data={dataGraph}
            dataKey="value"
            startAngle={90}
            endAngle={450}
            innerRadius={70}
            outerRadius={80}
            fill="#ff000"
            stroke="none"
            cornerRadius={50}
          >
            <Cell fill="red" />
            <Cell fill="transparent" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="flex flex-col text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <p className="font-semibold text-2xl w-16">
          {dataGraph[0].value * 100} %
        </p>
        <p className="text-[#74798C] w-16">de votre objectif</p>
      </div>
    </div>
  );
};

ScoreRadialBarChart.propsType = {
  userId: PropTypes.string.isRequired,
};

export default ScoreRadialBarChart;
