import useFetch from "../../hooks/useFetch";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import PropTypes from "prop-types";

/**
 * @component
 * Component for the activity chart
 * @param {Object} props
 * @param {string} props.userId
 * @returns {JSX.Element}
 */

const PerfRadarChart = ({ userId }) => {
  const { data, loading, error } = useFetch(
    `${userId}/performance`,
    "performance"
  );

  if (error) {
    return <p>Une erreur est survenu ({error})</p>;
  }

  if (loading) {
    return <p>Chargement ...</p>;
  }

  const kind = {
    1: "Cardio",
    2: "Energie",
    3: "Endurance",
    4: "Force",
    5: "Vitesse",
    6: "Intensité",
  };

  /**
   * Formatting to have an array of { value: data , kind: name_in_french}
   * @returns {Array<{value: string , kind: string}>}
   */

  const dataGraph = data.data
    .map((item) => {
      return {
        value: item.value,
        kind: kind[item.kind],
      };
    })
    .reverse();

  return (
    <div className="mt-6 w-[30%] h-[200px] bg-[#282D30] rounded-md">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart outerRadius="70%" data={dataGraph}>
          <PolarGrid radialLines={false} />
          <PolarAngleAxis
            dataKey="kind"
            stroke="white"
            tickLine={false}
            fontSize={8}
            dy={2}
          />
          <Radar dataKey="value" fill="#FF0101" fillOpacity={0.7} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

PerfRadarChart.propsType = {
  userId: PropTypes.string.isRequired,
};

export default PerfRadarChart;
