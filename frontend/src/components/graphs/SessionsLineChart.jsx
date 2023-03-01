// @ts-nocheck
import useFetch from "../../hooks/useFetch";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
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

const SessionsLineChart = ({ userId }) => {
  const { data, loading, error } = useFetch(
    `${userId}/average-sessions`,
    "session"
  );
  const dataGraph = data?.sessions;

  /**
   * Return the correponding Day in function of the tick
   * @param {number} tick
   * @returns {string}
   */

  const customDayFormatter = (tick) => {
    if (tick === 1) {
      return "L";
    }
    if (tick === 2) {
      return "M";
    }
    if (tick === 3) {
      return "M";
    }
    if (tick === 4) {
      return "J";
    }
    if (tick === 5) {
      return "V";
    }
    if (tick === 6) {
      return "S";
    }
    if (tick === 7) {
      return "D";
    }
  };

  const CustomTooltip = ({ payload, active }) => {
    if (active) {
      return (
        <div className="bg-white px-2 py-1 text-sm out ">
          <p>{payload[0].value}min</p>
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
    <div className="mt-6 w-[30%] h-[200px] bg-[#FF0000] rounded-md">
      <h3 className="text-white/60 absolute text-xs w-36 mt-6 ml-6">
        Durée moyenne des sessions
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={dataGraph}
          margin={{ top: 50, bottom: 20, left: 10, right: 10 }}
        >
          <XAxis
            dataKey="day"
            tickFormatter={customDayFormatter}
            fontFamily="Roboto"
            axisLine={false}
            tickLine={false}
            stroke="white"
            opacity={0.5}
            dy={10}
          />
          <YAxis dataKey="sessionLength" hide={true} />
          <Tooltip cursor={false} content={<CustomTooltip />} />
          <defs>
            <linearGradient id="whiteGradient">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.3)" />
              <stop offset="100%" stopColor="white" />
            </linearGradient>
          </defs>
          <Line
            type="monotone"
            dataKey="sessionLength"
            stroke="url(#whiteGradient)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

SessionsLineChart.propsType = {
  userId: PropTypes.string.isRequired,
};

export default SessionsLineChart;
