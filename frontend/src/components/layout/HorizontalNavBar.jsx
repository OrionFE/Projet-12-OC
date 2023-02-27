import React from "react";
import { NavLink } from "react-router-dom";
// @ts-ignore
import logo from './../../assets/logo.svg'

const HorizontalNavBar = () => {
  return (
    <nav className="bg-black h-[90px] w-full absolute top-0 z-10">
      <ul className="text-white flex justify-around items-center h-full  text-xl ">
        <li>
          <img src={logo} alt="" />
        </li>
        <li>
          <NavLink to={"/accueil"}>Accueil</NavLink>
        </li>
        <li>
          <NavLink to={"/profile"}>Profile</NavLink>
        </li>
        <li>
          <NavLink to={"/reglage"}>Réglage</NavLink>
        </li>
        <li>
          <NavLink to={"/communaute"}>Communauté</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default HorizontalNavBar;
