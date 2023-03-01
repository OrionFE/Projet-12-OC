import React from "react";
// @ts-ignore
import yoga from "./../../../public/icons/yoga.png";
// @ts-ignore
import swimming from "./../../../public/icons/swimming.png";
// @ts-ignore
import biking from "./../../../public/icons/biking.png";
// @ts-ignore
import lifting from "./../../../public/icons/lifting.png";
import { NavLink } from "react-router-dom";

/**
 * @component
 * Vertical navigation bar
 * @returns {JSX.Element}
 */

const VerticalNavBar = () => {
  return (
    <div className="w-[90px] h-full bg-black absolute top-0 flex flex-col justify-center">
      <nav className=" flex flex-col items-center justify-center h-[50%]">
        <ul className="flex flex-col gap-8">
          <li>
            <NavLink to={"/yoga"}>
              <img src={yoga} alt="yoga logo" />
            </NavLink>
          </li>
          <li>
            <NavLink to={"/swimming"}>
              <img src={swimming} alt="swimming logo" />
            </NavLink>
          </li>
          <li>
            <NavLink to={"/biking"}>
              <img src={biking} alt="biking logo" />
            </NavLink>
          </li>
          <li>
            <NavLink to={lifting}>
              <img src={lifting} alt="lifting logo" />
            </NavLink>
          </li>
        </ul>
      </nav>

      <footer className="text-white -rotate-90 w-[200px] -translate-x-[55px] mt-[100px] text-sm ">
        Copyright, SportSee 2020
      </footer>
    </div>
  );
};

export default VerticalNavBar;
