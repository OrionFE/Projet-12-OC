import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import useFetch from "../../hooks/useFetch";
import { useState } from "react";

const BarChart = ({ userId }) => {
  const { data, loading, error } = useFetch(`${userId}/activity`);
  const svgRef = useRef();
  const [tooltipBox, setTooltipBox] = useState(null);

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

  useEffect(() => {
    if (!dataGraph) {
      return;
    }

    const h = 150;
    const w = 450;
    const margin = 30;
    const svg = d3
      .select(svgRef.current)
      .attr("width", w + margin)
      .attr("height", h + margin)
      .attr("transform", "translate(20 , 50)")
      .attr("overflow", "visible");

    const xScale = d3
      .scaleBand()
      .domain(dataGraph.map((d) => d.day))
      .range([0, w]);

    const xAxis = d3.axisBottom(xScale).tickSize(0).tickPadding(20);

    const yMin = d3.min(dataGraph, (d) => d.kilogram);

    const yMax = d3.max(dataGraph, (d) => d.kilogram);

    const yScale = d3
      .scaleLinear()
      .domain([yMin - 2, yMax + 2])
      .range([h, 0]);

    const yMinCal = d3.min(dataGraph, (d) => d.calories) - 50;
    const yMaxCal = d3.max(dataGraph, (d) => d.calories) + 50;
    const yScaleCalorie = d3
      .scaleLinear()
      .domain([yMinCal, yMaxCal])
      .range([h, 0]);

    const range = [
      d3.min(dataGraph, (d) => d.kilogram) - 2,
      Math.round(
        (d3.min(dataGraph, (d) => d.kilogram) -
          2 +
          d3.max(dataGraph, (d) => d.kilogram) +
          2) /
          2
      ),
      d3.max(dataGraph, (d) => d.kilogram) + 2,
    ];

    const yAxis = d3
      .axisRight(yScale)
      .tickValues(range)
      .tickSize(-w)
      .tickSizeOuter(0)
      .tickPadding(20);

    svg
      .append("g")
      .call(yAxis)
      .attr("transform", `translate(${w} , 0)`)
      .select(".domain")
      .attr("stroke", "none");

    svg
      .append("g")
      .attr("transform", `translate(0 , ${h})`)
      .call(xAxis)
      .select(".domain")
      .attr("stroke", "#DEDEDE");

    svg
      .selectAll(".tick line")
      .attr("stroke", "#DEDEDE")
      .attr("stroke-dasharray", "1 2");

    svg.selectAll("text").attr("fill", "#9B9EAC").attr("font-size", "16px");

    svg
      .selectAll(".group")
      .data(dataGraph)
      .enter()
      .append("g")
      .attr("class", "group")
      .attr("transform", function (d) {
        return `translate(${xScale(d.day) + 30} , 0)`;
      })
      .selectAll("rect")
      .data(function (d) {
        return [d.kilogram, d.calories, "tooltip"];
      })
      .enter()
      .append("rect")
      .attr("class", function (d, i) {
        if (i == 0) {
          return "";
        } else if (i == 1) {
          return "";
        } else {
          return "tooltip-box";
        }
      })
      .attr("height", function (d, i) {
        if (i == 0) {
          return h - yScale(d);
        } else if (i == 1) {
          return h - yScaleCalorie(d);
        } else {
          return h;
        }
      })
      .attr("width", function (d, i) {
        if (i == 0) {
          return "7px";
        } else if (i == 1) {
          return "7px";
        } else {
          return xScale.bandwidth();
        }
      })
      .attr("fill", function (d, i) {
        if (i == 0) {
          return "#282D30";
        } else if (i == 1) {
          return "#E60000";
        } else {
          return "hsla(0, 0%, 77%, 0.0)";
        }
      })
      .attr("x", function (d) {
        return xScale(d.day);
      })
      .attr("y", function (d, i) {
        if (i == 0) {
          return yScale(d);
        } else if (i == 1) {
          return yScaleCalorie(d);
        } else {
          return h;
        }
      })
      .attr("transform", function (d, i) {
        if (i == 0) {
          return "translate(-10 , 0)";
        } else if (i == 1) {
          return "translate(10 , 0)";
        } else {
          return `translate(-30, ${-h})`;
        }
      })
      .attr("rx", "5");

    d3.selectAll("rect.tooltip-box")
      .on("mouseover", function (event) {
        // @ts-ignore
        const groupData = d3.select(this.parentNode).datum();
        const kilogram = groupData.kilogram;
        const calories = groupData.calories;
        d3.select(this).attr("fill", "hsla(0, 0%, 77%, 0.5)");
        // @ts-ignore
        const x = d3.select(this).node().getBoundingClientRect().right;
        // @ts-ignore
        const y = d3.select(this).node().getBoundingClientRect().top;
        setTooltipBox({ x, y, kilogram, calories });
      })
      .on("mouseout", function () {
        d3.select(this).attr("fill", "hsla(0, 0%, 77%, 0.0)");
        setTooltipBox(null);
      });
  }, [data]);

  return (
    <div className="h-[280px] w-full bg-primaryBg ">
      <div className="pt-5 pl-5 flex justify-between items-center">
        <h5 className="font-semibold text-sm">Activité quotidienne</h5>
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

      {tooltipBox && (
        <div
          className={`absolute bg-[#E60000] z-10 p-2 text-white text-sm`}
          style={{ top: tooltipBox.y - 25, left: tooltipBox.x + 10 }}
        >
          <p>{tooltipBox.kilogram} kg</p>
          <p>{tooltipBox.calories} kCal</p>
        </div>
      )}
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default BarChart;
