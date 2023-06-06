import React, { useEffect } from "react";
import * as d3 from "d3";

function BinaryTreeDataVisual({ data }) {
  useEffect(() => {
    const width = 1200;
    const height = 500;

    const svg = d3.select("svg").attr("width", width).attr("height", height);

    const padding = 50;
    const treeLayout = d3
      .tree()
      .size([width - 2 * padding, height - 2 * padding]);

    const dataCopy = JSON.parse(JSON.stringify(data));
    const root = d3.hierarchy(dataCopy, (d) => d.children);
    treeLayout(root);

    const clearHighlights = (node) => {
      if (!node) return;
      node.data.highlight = false;
      if (node.children) {
        node.children.forEach(clearHighlights);
      }
    };

    const highlightPath = (node) => {
      if (!node) return;
      node.data.highlight = true;
      if (node.parent) highlightPath(node.parent);
    };

    const update = (root) => {
      // eslint-disable-next-line no-unused-vars
      const link = svg
        .selectAll(".link")
        .data(root.links(), (d) => d.target.id)
        .join("path")
        .attr(
          "class",
          (d) => `link ${d.target.data.highlight ? "highlight" : ""}`
        )
        .attr(
          "d",
          (d) =>
            `M ${d.source.x + padding},${d.source.y + padding} L ${
              d.target.x + padding
            },${d.target.y + padding}`
        );

      const g = svg
        .selectAll("g")
        .data(root.descendants(), (d) => d.id || (d.id = Math.random()))
        .join("g")
        .attr(
          "transform",
          (d) => `translate(${d.x + padding},${d.y + padding})`
        )
        .attr("class", (d) => `node ${d.data.highlight ? "highlight" : ""}`)
        .on("click", (event, d) => {
          clearHighlights(root);
          highlightPath(d);
          update(root);
        });

      g.selectAll("circle")
        .data((d) => [d])
        .join("circle")
        .attr("r", 20);

      g.selectAll("text")
        .data((d) => [d])
        .join("text")
        .attr("dx", -10)
        .attr("dy", 5)
        .text((d) => d.data.name);
    };

    update(root);
  }, [data]);

  return (
    <div>
      <svg className="tree-svg"></svg>
    </div>
  );
}

export default BinaryTreeDataVisual;
