$(document).ready(function() {

  // d3.js Heat Map
  // Jeremy Wong

  /* =======================================
      Attributes
     ======================================= */
  var w = $(window).width() - 200;
  var h = 200;

  // Padding
  var textPadding = 10;
  var rightEdgePadding = 40;

  // Text Line Height
  var lineHeight = 8;

  // Label Value Formatter
  var valueFormatter = d3.format('.1s');

  // Element Widths
  var yAxisLabelWidth = 100;
  var viewButtonWidth = 75;

  // Start Position for Bars
  var startBars = viewButtonWidth + yAxisLabelWidth;

  // End Position for Y Axis Labels
  var endYAxisLabels = viewButtonWidth + yAxisLabelWidth - textPadding;

  // Find Start Position for Bar Label
  function startBarLabelPosition(d) {
    return viewButtonWidth + yAxisLabelWidth + xScale(d) + textPadding;
  }

  /* =======================================
      Data
     ======================================= */
  var dataset = [934, 6000, 12000, 48000, 64000];
  var categories = ['10+ Page Views', '5-9 Page Views', '2-4 Page Views', '1 Page View', 'All'];
  var colors = ['186, 38, 43', '212,80,51', '246,142,53', '255,190,55', '35,80,116'];


  /* =======================================
      Scales
     ======================================= */

  // Max Range for width of bars
  var maxRange = w - viewButtonWidth - yAxisLabelWidth - rightEdgePadding;
  var xScale = d3.scale.linear()
    .domain([0, d3.max(dataset)])
    .range([10, maxRange]);

  var yScale = d3.scale.ordinal()
    .domain(d3.range(dataset.length))
    .rangeRoundBands([0, h], 0.2);

  /* =======================================
      SVG Element
     ======================================= */
  var svg = d3.select('.container')
    .append('svg')
    .attr('width', w)
    .attr('height', h)
    .style('border', '1px solid black');

  // Create Chart
  createChart();

  /* =======================================
      Event Handlers
     ======================================= */

  // Mouse Events
  function createBarEvents() {
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
  }

  // On Window Resize
  window.onresize = function(event) {
    // Update Width
    w = $(window).width() - 200;

    // Update Max Range
    maxRange = w - viewButtonWidth - yAxisLabelWidth - rightEdgePadding;

    // Update xScale
    xScale = d3.scale.linear()
      .domain([0, d3.max(dataset)])
      .range([10, maxRange]);

    // Resize SVG
    svg.attr('width', w);

    // Resize Bars
    svg.selectAll('rect')
      .data(dataset)
      .transition()
      .delay(function(d, i) {
        return i / dataset.length * 1000;
      })
      .duration(200)
      .ease('linear')
      .attr('width', function(d) {
        return xScale(d);
      });

    // Resize Bar Labels
    svg.selectAll(".bar-label")
      .data(dataset)
      .transition()
      .delay(function(d, i) {
        return i / dataset.length * 1000;
      })
      .duration(150)
      .attr("x", function(d, i) {
        return startBarLabelPosition(d);
      });
  };

  /* =======================================
      Chart Generation Functions
     ======================================= */

  function createChart() {
    createBars();
    createBarEvents();
    createYAxisLabels();
    createBarLabels();
    createViewButtons();
  }

  // Create Bars
  function createBars() {
    svg.selectAll('rect')
      .data(dataset)
      .enter()
      .append('rect')
      .classed('bar', true)
      .attr('x', viewButtonWidth + yAxisLabelWidth)
      .attr('y', function(d, i) {
        return yScale(i);
      })
      .attr('width', function(d) {
        return xScale(d); // Padding to the right
      })
      .attr('height', yScale.rangeBand())
      .attr('fill', function(d, i) {
        return 'rgb(' + colors[i] + ')';
      });
  }

  // Create yAxis Labels
  function createYAxisLabels() {
    svg.selectAll(".xAxis-label")
      .data(dataset)
      .enter()
      .append("text")
      .classed('xAxis-label', true)
      .text(function(d, i) {
        return categories[i];
      })
      .attr("x", 90 + viewButtonWidth)
      .attr("y", function(d, i) {
        return yScale(i) + (lineHeight / 2) + (yScale.rangeBand() / 2);
      })
      .attr("font-family", "sans-serif")
      .attr("font-size", "12px")
      .attr("fill", "black")
      .style("text-anchor", "end");
  }

  // Create Bar Labels
  function createBarLabels() {
    svg.selectAll(".bar-label")
      .data(dataset)
      .enter()
      .append("text")
      .classed('bar-label', true)
      .text(function(d, i) {
        return valueFormatter(d);
      })
      .attr("x", function(d, i) {
        return startBarLabelPosition(d);
      })
      .attr("y", function(d, i) {
        return yScale(i) + (lineHeight / 2) + (yScale.rangeBand() / 2);
      })
      .attr("font-family", "sans-serif")
      .attr("font-size", "12px")
      .attr("font-weight", 600)
      .attr("fill", "black");
  }

  // View Buttons
  function createViewButtons() {
    svg.selectAll(".view-button")
      .data(dataset)
      .enter()
      .append("rect")
      .classed('view-button', true)
      .attr("x", 5)
      .attr("y", function(d, i) {
        return yScale(i);
      })
      .attr("width", 60)
      .attr("height", yScale.rangeBand())
      .attr("rx", 5)
      .attr("ry", 5)
      .attr("fill", function(d) {
        return 'rgb(' + colors[2] + ')';
      });

    svg.selectAll(".view-text")
      .data(dataset)
      .enter()
      .append("text")
      .classed('view-text', true)
      .text('View')
      .attr("x", 5)
      .attr("y", function(d, i) {
        return yScale(i) + (lineHeight / 2) + (yScale.rangeBand() / 2);
      })
      .attr("font-family", "sans-serif")
      .attr("font-size", "12px")
      .attr("fill", "white");
  }


});