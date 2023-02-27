import React, { useRef } from "react";
import useFetch from "../../hooks/useFetch";
import * as d3 from "d3";
import { useEffect } from "react";

const RadarChart = ({ userId }) => {
  const { data, loading, error } = useFetch(`${userId}/performance`);
  const svgRef = useRef();

  console.log(data);

  useEffect(() => {
    if (!data) {
      return;
    }

    const kind = data.kind;
    const dataGraph = data.data;

    const h = "100%";
    const w = "100%";

    const svg = d3.select(svgRef.current).attr("width", w).attr("height", h);

    const width =
      // @ts-ignore
      d3.select("#radarchart").node().getBoundingClientRect().width - 30;

    const height =
      d3
        .select("#radarchart")
        .node()
        // @ts-ignore
        .getBoundingClientRect().height - 30;

    const ticks = [50, 100, 150, 200, 250];

    const dataH = [
      { x: 50, y: 50 },
      { x: 100, y: 100 },
      { x: 150, y: 150 },
      { x: 200, y: 200 },
      { x: 250, y: 250 },
    ];

    // Échelle radiale
    const radialScale = d3
      .scaleLinear()
      .domain([0, 250])
      .range([0, width - 90]);

    // Fonction pour créer un hexagone à partir d'un point de données
    function createHexagon(d) {
      const radius = radialScale(d.x);
      const angles = d3.range(0, 2 * Math.PI, Math.PI / 3);
      const points = angles.map((angle) => [
        radius * Math.cos(angle) + width / 2,
        radius * Math.sin(angle) + height / 2,
      ]);
      return d3.polygonHull(points);
    }

    // Dessine les hexagones
    svg
      .selectAll("path")
      .data(dataH)
      .join("path")
      .attr("d", (d) => `M ${createHexagon(d).join(" L")} Z`)
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("transform", "rotate(-30) translate( -45 , 45)");

    function angleToCoordinate(angle, value) {
      let x = Math.cos(angle) * radialScale(value);
      let y = Math.sin(angle) * radialScale(value);
      return { x: width / 2 + x, y: height / 2 - y };
    }

    console.log(Object.values(kind));

    let featureData = Object.values(kind).map((f, i) => {
      let angle = Math.PI / 2 + (2 * Math.PI * i) / Object.values(kind).length;
      return {
        name: f,
        angle: angle,
        label_coord: angleToCoordinate(angle, width + 200),
      };
    });

    svg
      .selectAll(".axislabel")
      .data(featureData)
      .join((enter) =>
        enter
          .append("text")
          .attr("x", (d) => d.label_coord.x)
          .attr("y", (d) => d.label_coord.y)
          .attr("fill", "white")
          .attr("transform", "translate(0 , 10)")
          .style("font-size", "8px")
          .text((d) => d.name)
      );
  }, [data]);

  return (
    <div
      className="mt-6 w-[30%] h-[200px] bg-[#282D30] rounded-md"
      id="radarchart"
    >
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default RadarChart;
