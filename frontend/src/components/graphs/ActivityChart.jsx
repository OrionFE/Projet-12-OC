// @ts-nocheck
import useFetch from "../../hooks/useFetch";
import PropTypes from "prop-types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/**
 * @component
 * Component for the activity chart
 * @param {Object} props
 * @param {string} props.userId
 * @returns {JSX.Element}
 */

const ActivityChart = ({ userId }) => {
  const { data, loading, error } = useFetch(`${userId}/activity`, "activity");

  /**
   * Return the same data but the date is in the correct form ( from dd-mm-yyyy to number of the day)
   *
   * @returns {Array.<Object>}
   */

  function getFormatDate() {
    if (!data) {
      return;
    }

    let array = [];

    data?.sessions.map((d) => {
      const date = new Date(d.day);
      const day = date.getDate();

      const newValue = {
        day: day,
        kilogram: d.kilogram,
        calories: d.calories,
      };
      array.push(newValue);
    });

    return array;
  }
  const dataGraph = getFormatDate();

  const h = 250;
  const w = 550;

  const CustomTooltip = ({ payload, active }) => {
    if (active) {
      return (
        <div className="bg-[#E60000] text-white px-2 py-4 text-sm out ">
          <p>{payload[0].value}kg</p>
          <p>{payload[1].value}Kcal</p>
        </div>
      );
    }
  };

  if (error) {
    return <p>Une erreur est survenu ({error})</p>;
  }

  if (loading) {
    return <p>Chargement ...</p>;
  }

  return (
    <div className="h-full w-full bg-primaryBg pl-5 ">
      <div className="flex justify-between mb-6 pt-4">
        <h3 className="font-semibold ">Activité quotidienne</h3>
        <div className="text-[#74798C] text-xs flex gap-2">
          <div className="flex items-center gap-2">
            <svg height="10" width="10">
              <circle cx="5" cy="5" r="5" fill="#282D30" />
            </svg>
            <p>Poids (kg)</p>
          </div>
          <div className="flex items-center gap-1 pr-5">
            <svg height="10" width="10">
              <circle cx="5" cy="5" r="5" fill="#E60000" />
            </svg>
            <p>Calories brulées (kCal)</p>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart width={w} height={h} data={dataGraph} barGap={10}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" tickLine={false} />
          <YAxis
            dataKey="kilogram"
            orientation="right"
            axisLine={false}
            tickLine={false}
            tickCount={3}
            domain={["dataMin - 1", "dataMax + 2"]}
          />
          <YAxis
            domain={["dataMin - 100", "dataMax + 100"]}
            dataKey="calories"
            hide={true}
            yAxisId="kcal"
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="kilogram"
            fill="#282D30"
            radius={[30, 30, 0, 0]}
            barSize={10}
          />
          <Bar
            dataKey="calories"
            fill="#E60000"
            radius={[30, 30, 0, 0]}
            barSize={10}
            yAxisId="kcal"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

ActivityChart.propsType = {
  userId: PropTypes.string.isRequired,
};

export default ActivityChart;
