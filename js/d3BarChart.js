$(document).ready(function() {

  // Attributes
  var w = 500;
  var h = 100;
  var barPadding = 1;

  // Data
  var dataset = [100, 200, 300, 400, 500];
  // var dataset = [
  //   [5, 20],
  //   [480, 90],
  //   [250, 50],
  //   [100, 33],
  //   [330, 95],
  //   [410, 12],
  //   [475, 44],
  //   [25, 67],
  //   [85, 21],
  //   [220, 88]
  // ];

  // SVG Scatterplot
  // var svg = d3.select('.container')
  //   .append('svg')
  //   .attr('width', w)
  //   .attr('height', h);

  // svg.selectAll('circle')
  //   .data(dataset)
  //   .enter()
  //   .append('circle')
  //   .attr('cx', function(d) {
  //     return d[0];
  //   })
  //   .attr('cy', function(d) {
  //     return d[1];
  //   })
  //   .attr('r', function(d) {
  //     return Math.sqrt(h - d[1]);
  //   });

  // svg.selectAll('text')
  //   .data(dataset)
  //   .enter()
  //   .append("text")
  //   .text(function(d) {
  //     return d[0] + ', ' + d[1];
  //   })
  //   .attr('x', function(d) {
  //     return d[0];
  //   })
  //   .attr('y', function(d) {
  //     return d[1];
  //   })
  //   .attr("font-family", "sans-serif")
  //   .attr("font-size", "11px")
  //   .attr("fill", "red");

  // SVG Bar Chart
  // var svg = d3.select(".container")
  //   .append("svg")
  //   .attr("width", w)
  //   .attr("height", h);

  // svg.selectAll("rect")
  //   .data(dataset)
  //   .enter()
  //   .append("rect")
  //   .attr("x", function(d, i) {
  //     return i * (w / dataset.length);
  //   })
  //   .attr("y", function(d) {
  //     return h - (d * 4);
  //   })
  //   .attr("width", w / dataset.length - barPadding)
  //   .attr("height", function(d) {
  //     return d * 4;
  //   })
  //   .attr("fill", function(d) {
  //     return "rgb(" + (d * 5) + ", " + (d * 2) + ", " + (d * 10) + ")";
  //   });

  // svg.selectAll("text")
  //   .data(dataset)
  //   .enter()
  //   .append("text")
  //   .text(function(d) {
  //     return d;
  //   })
  //   .attr("x", function(d, i) {
  //     return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2;
  //   })
  //   .attr("y", function(d) {
  //     return h - (d * 4) + 14;
  //   })
  //   .attr("font-family", "sans-serif")
  //   .attr("font-size", "11px")
  //   .attr("fill", "white")
  //   .attr("text-anchor", "middle");

  // SVG Circles
  // var svg = d3.select(".container")
  //   .append("svg")
  //   .attr("width", w)
  //   .attr("height", h);

  // var circles = svg.selectAll("circle")
  //   .data(dataset)
  //   .enter()
  //   .append("circle");

  // circles.attr("cx", function(d, i) {
  //   return (i * 60) + 25;
  // })
  //   .attr("cy", h/2)
  //   .attr("r", function(d) {
  //     return d;
  //   })
  //   .attr("fill", "yellow")
  //   .attr("stroke", "orange")
  //   .attr("stroke-width", function(d, i) {
  //     return i * 2;
  //   });
});