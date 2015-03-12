$(document).ready(function() {

  // Attributes
  var w = $(window).width() - 200;
  var h = 200;
  var padding = 30;
  var viewPadding = 100;
  var lineHeight = 8;
  var textPadding = 10;

  // Data
  var dataset = [934, 6000, 12000, 48000, 64000];
  var colors = ['186, 38, 43', '212,80,51', '246,142,53', '255,190,55', '35,80,116'];
  var categories = ['10+ Page Views', '5-9 Page Views', '2-4 Page Views', '1 Page View', 'All'];

  // Create SVG Element
  var svg = d3.select('.container')
    .append('svg')
    .attr('width', w)
    .attr('height', h)
    .style('border', '1px solid black');

  // Scales
  var xScale = d3.scale.linear()
    .domain([0, d3.max(dataset)])
    .range([0, w - 100 - viewPadding]);

  var yScale = d3.scale.ordinal()
    .domain(d3.range(dataset.length))
    .rangeRoundBands([0, h], 0.2);

  // Label Value Formatter
  var valueFormatter = d3.format('.1s');

  // Create Bars
  svg.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .classed('bar', true)
    .attr('x', 100 + viewPadding)
    .attr('y', function(d, i) {
      return yScale(i);
    })
    .attr('width', function(d) {
      return xScale(d) / 1.1; // Padding to the right
    })
    .attr('height', yScale.rangeBand())
    .attr('fill', function(d, i) {
      return 'rgb(' + colors[i] + ')';
    });

  // Mouse Events
  svg.selectAll('rect')
    .on('mouseover', function(d, i) {
      d3.select(this)
        .attr('fill', function(d) {
          var index = dataset.indexOf(d);
          return 'rgba(' + colors[index] + ', 0.4)';
        });
    })
    .on('mouseout', function(d, i) {
      d3.select(this)
        .attr('fill', function(d, i) {
          var index = dataset.indexOf(d);
          return 'rgb(' + colors[index] + ')';
        });
    });

  // Create yAxis Labels
  svg.selectAll(".xAxis-label")
    .data(dataset)
    .enter()
    .append("text")
    .classed('xAxis-label', true)
    .text(function(d, i) {
      return categories[i];
    })
    .attr("x", 90 + viewPadding)
    .attr("y", function(d, i) {
      return yScale(i) + (lineHeight / 2) + (yScale.rangeBand() / 2);
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "12px")
    .attr("fill", "black")
    .style("text-anchor", "end");

  // Create Bar Labels
  svg.selectAll(".bar-label")
    .data(dataset)
    .enter()
    .append("text")
    .classed('bar-label', true)
    .text(function(d, i) {
      return valueFormatter(d);
    })
    .attr("x", function(d, i) {
      return 100 + viewPadding + xScale(d) / 1.1 + textPadding;
    })
    .attr("y", function(d, i) {
      return yScale(i) + (lineHeight / 2) + (yScale.rangeBand() / 2);
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "12px")
    .attr("font-weight", 600)
    .attr("fill", "black");

  // View Buttons

});