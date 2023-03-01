// @ts-nocheck
import React from "react";
import calIcon from "./../../../public/icons/caloriesIcon.png";
import protIcon from "../../../public/icons/proteinIcon.png";
import carbsIcon from "../../../public/icons/carbsIcon.png";
import fatIcon from "../../../public/icons/fatIcon.png";
import useFetch from "../../hooks/useFetch";
import NutriCardMarker from "./NutriCardMarker";

const NutriCard = ({ userId }) => {
  const { data, loading, error } = useFetch(`${userId}`, "user");

  if (error) {
    return <p>Une erreur est survenu ({error})</p>;
  }

  if (loading) {
    return <p>Chargement ...</p>;
  }

  const dataCard = data.keyData;

  return (
    <>
      <NutriCardMarker
        data={`${dataCard.calorieCount}Kcal`}
        icon={calIcon}
        type={"Calories"}
      />
      <NutriCardMarker
        data={`${dataCard.proteinCount}g`}
        icon={protIcon}
        type={"Proteines"}
      />
      <NutriCardMarker
        data={`${dataCard.carbohydrateCount}g`}
        icon={carbsIcon}
        type={"Glucides"}
      />
      <NutriCardMarker
        data={`${dataCard.lipidCount}g`}
        icon={fatIcon}
        type={"Lipides"}
      />
    </>
  );
};

export default NutriCard;
