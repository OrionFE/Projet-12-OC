import React from "react";

const NutriCardMarker = ({ data, icon, type }) => {
  return (
    <div className="bg-primaryBg rounded-lg w-full h-[20%] flex items-center">
      <div className="flex justify-around items-center w-full">
        <img src={icon} alt="calories icone" className="w-[50px] ml-4" />
        <div className="w-24">
          <p className="font-semibold text-lg">{data}</p>
          <p className="text-sm text-[#74798C]">{type}</p>
        </div>
      </div>
    </div>
  );
};

export default NutriCardMarker;
