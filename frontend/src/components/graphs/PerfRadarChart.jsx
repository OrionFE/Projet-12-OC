import useFetch from "../../hooks/useFetch";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

const PerfRadarChart = ({ userId }) => {
  const { data, loading, error } = useFetch(`${userId}/performance`);

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

export default PerfRadarChart;
