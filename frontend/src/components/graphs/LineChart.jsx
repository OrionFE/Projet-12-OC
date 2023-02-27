import React, { useRef } from "react";
import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import * as d3 from "d3";

const LineChart = ({ userId }) => {
  // @ts-ignore
  const { data, loading, error } = useFetch(`${userId}/average-sessions`);
  const svgRef = useRef();

  useEffect(() => {
    if (!data) {
      return;
    }
    const dataGraph = data.sessions;

    const h = "100%";
    const w = "100%";
    const svg = d3
      .select(svgRef.current)
      .attr("width", w)
      .attr("height", h)
      .attr("overflow", "visible");

    // @ts-ignore
    const width = d3.select("#linechart").node().getBoundingClientRect().width;
    // @ts-ignore
    const height = d3
      .select("#linechart")
      .node()
      // @ts-ignore
      .getBoundingClientRect().height;

    const xScale = d3.scaleLinear().domain([0, 6]).range([0, width]);

    const dayOfWeek = ["L", "M-1", "M-2", "J", "V", "S", "D"];

    const xScaleDay = d3
      .scaleBand()
      .domain(dayOfWeek)
      .range([5, width - 5]);

    const xAxis = d3
      .axisBottom(xScaleDay)
      .tickValues(dayOfWeek)
      .tickFormat(function (d) {
        return d.replace(/-\d+/, "");
      });

    svg
      .append("g")
      .call(xAxis)
      .attr("transform", `translate(0 , ${height - 30})`)
      .select(".domain")
      .attr("stroke", "none");

    svg.selectAll(".tick").selectAll("line").attr("stroke", "none");

    svg
      .selectAll(".tick")
      .selectAll("text")
      .style("fill", "hsla(0, 0%, 100%, 0.5)");

    const yMax = d3.max(dataGraph, (d) => d.sessionLength);
    const yScale = d3
      .scaleLinear()
      // @ts-ignore
      .domain([0, yMax])
      .range([height * 0.7 - 30, 0]);

    const lineGenerator = d3
      .line()
      // @ts-ignore
      .x(function (d, i) {
        return xScale(i);
      })
      .y(function (d) {
        // @ts-ignore
        return yScale(d.sessionLength);
      })
      .curve(d3.curveMonotoneX);

    const line = lineGenerator(dataGraph);

    d3.select(".line")
      .attr("transform", "translate(0 , 60)")
      .append("path")
      .attr("d", line)
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", "2")
      .attr("opacity", "0.5");

    // Création du cercle
    const circle = svg
      .append("circle")
      .attr("r", 5)
      .attr("opacity", 0)
      .style("fill", "white");

    const rectText = svg
      .append("rect")
      .attr("x", 10)
      .attr("y", 10)
      .attr("width", 50)
      .attr("height", 20)
      .attr("fill", "white")
      .attr("opacity", 0);

    // Création du texte
    const text = svg
      .append("text")
      .attr("x", 10)
      .attr("y", 10)
      .style("font-size", "12px");

    svg.on("mousemove", (event) => {
      // Récupération des coordonnées de la souris
      const [mouseX, mouseY] = d3.pointer(event);

      // Calcul de l'index du point le plus proche de la souris
      const bisect = d3.bisector((d) => d.day).left;
      const index = bisect(dataGraph, xScale.invert(mouseX));

      // Affichage du cercle et du texte
      circle
        .attr("cx", xScale(dataGraph[index].day) - 30)
        .attr("cy", yScale(dataGraph[index].sessionLength) + 60)
        .attr("opacity", 1);

      rectText
        .attr("x", xScale(dataGraph[index].day) - 25)
        .attr("y", yScale(dataGraph[index].sessionLength) + 35)
        .attr("opacity", 1);

      text
        .text(`${dataGraph[index].sessionLength} min`)
        .attr("x", xScale(dataGraph[index].day) - 20)
        .attr("y", yScale(dataGraph[index].sessionLength) + 50);
    });

    svg.on("mouseout", () => {
      // Masquage du cercle et du texte
      circle.attr("opacity", 0);
      rectText.attr("opacity", "0");
      text.text("");
    });
  }, [data]);

  return (
    <div
      className="mt-6 w-[30%] h-[200px] bg-[#FF0000] rounded-md"
      id="linechart"
    >
      <h4 className="text-white/60 absolute text-xs w-36 mt-6 ml-6">
        Durée moyennes des sessions
      </h4>
      <svg ref={svgRef}>
        <g className="line"></g>
      </svg>
    </div>
  );
};

export default LineChart;
