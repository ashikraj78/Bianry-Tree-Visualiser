import React, { useEffect } from "react";
import * as d3 from "d3";

function BinaryTreeDataVisual({ data }) {
  useEffect(() => {
    const width = 1200;
    const height = 500;

    const svg = d3.select("svg").attr("width", width).attr("height", height);

    const padding = 50;
    const treeLayout = d3.tree().size([width, height - 2 * padding]);

    const root = d3.hierarchy(data, (d) => d.children);
    const links = treeLayout(root).links();
    const nodes = root.descendants();

    const highlightPath = (node) => {
      if (!node) return;
      // console.log("thisis cick");

      node.highlight = true;
      highlightPath(node.parent);
    };

    const g = svg
      .append("g")
      .attr("transform", `translate(${padding},${padding})`);

    g.selectAll(".link")
      .data(links)
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("d", (d) => {
        return `
          M${d.source.x},${d.source.y}
          L${d.target.x},${d.target.y}
        `;
      });

    g.selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.x},${d.y})`)
      .on("click", (event, d) => {
        highlightPath(d);
        // update(root);
      });

    g.selectAll(".node").append("circle").attr("r", 20);

    g.selectAll(".node")
      .append("text")
      .attr("dx", -10)
      .attr("dy", 5)
      .text((d) => d.data.name);
  }, [data]);

  return (
    <div>
      <svg className="tree-svg"></svg>
    </div>
  );
}

export default BinaryTreeDataVisual;
