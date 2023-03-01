import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import ActivityChart from "../components/graphs/ActivityChart";
import SessionsLineChart from "../components/graphs/SessionsLineChart";
import PerfRadarChart from "../components/graphs/PerfRadarChart";
import useFetch from "../hooks/useFetch";
import ScoreRadialBarChart from "../components/graphs/ScoreRadialBarChart";

const Profile = () => {
  // http://localhost:3000/user/12 pour nom user / Round chart / calories
  // http://localhost:3000/user/12/activity pour barchart
  // http://localhost:3000/user/12/average-sessions pour Line chart
  // http://localhost:3000/user/12/performance pour Star chart

  const { userId } = useParams();

  const { data, loading, error } = useFetch(`${userId}`);

  return (
    <div>
      {loading && <p>Loading ...</p>}
      {error ? (
        <p>Une erreur est survenu ( {error} )</p>
      ) : (
        <>
          <h2 className="text-3xl">
            Bonjour{" "}
            <span className="text-[#FF0101]">{data?.userInfos.firstName}</span>
          </h2>
          <p className="mt-4 text-lg tracking-wide">
            Félicitation ! Vous avez explosé vos objectifs hier 👏
          </p>
        </>
      )}
      <div className="w-[70%]">
        <div className="mr-[90px] w-full mt-5">
          <ActivityChart userId={userId} />
        </div>
        <div className="flex gap-[5%]">
          <SessionsLineChart userId={userId} />
          <PerfRadarChart userId={userId} />
          <ScoreRadialBarChart userId={userId} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
