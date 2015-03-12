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
  var leftViewButtonPadding = 5;
  var rightViewButtonPadding = 10;

  // Text Line Height
  var lineHeight = 8;

  // Label Value Formatter
  var valueFormatter = d3.format('.2s');

  // Element Widths
  var yAxisLabelWidth = 100;
  var viewButtonWidth = 75;

  // Start Position for Bars
  var startBars = viewButtonWidth + yAxisLabelWidth;

  // End Position for Y Axis Labels
  var endYAxisLabels = viewButtonWidth + yAxisLabelWidth - textPadding;

  // Color of Selected Group
  var selectedColor = '150,222,136';

  // Find Start Position for Bar Label
  function startBarLabelPosition(d) {
    return viewButtonWidth + yAxisLabelWidth + xScale(d) + textPadding;
  }

  /* =======================================
      Data
     ======================================= */
  var dataset = {
    data: [{
      value: 934,
      category: '10+ Page Views',
      color: '186, 38, 43'
    }, {
      value: 6000,
      category: '5-9 Page Views',
      color: '212, 80, 51'
    }, {
      value: 12000,
      category: '2-4 Page Views',
      color: '246, 142, 53'
    }, {
      value: 48000,
      category: '1 Page View',
      color: '255,190,55'
    }, {
      value: 64000,
      category: 'All',
      color: '35,80,116'
    }],
    // data: [934, 6000, 12000, 48000, 64000],
    // categories: ['10+ Page Views', '5-9 Page Views', '2-4 Page Views', '1 Page View', 'All'],
    // colors: ['186, 38, 43', '212,80,51', '246,142,53', '255,190,55', '35,80,116', '150,222,136'],
    selected: 0
  };

  /* =======================================
      Scales
     ======================================= */

  // Max Range for width of bars
  var maxRange = w - viewButtonWidth - yAxisLabelWidth - rightEdgePadding;
  var xScale = d3.scale.linear()
    .domain([0, d3.max(dataset.data, function(d) {
      return d.value;
    })])
    .range([10, maxRange]);

  var yScale = d3.scale.ordinal()
    .domain(d3.range(dataset.data.length))
    .rangeRoundBands([0, h], 0.2);

  /* =======================================
      SVG Element
     ======================================= */
  var svg = d3.select('.container')
    .append('svg')
    .attr('width', w)
    .attr('height', h);
    // .style('border', '1px solid black');

  // Create Chart
  createChart();

  /* =======================================
      Event Handlers
     ======================================= */

  // Mouse Events
  function createBarEvents() {
    svg.selectAll('.bar')
      .on('mouseover', function(d, i) {
        d3.select(this)
          .attr('fill', function(d) {
            var index = dataset.data.indexOf(d);
            return 'rgba(' + dataset.data[index].color + ', 0.4)';
          });
      })
      .on('mouseout', function(d, i) {
        d3.select(this)
          .attr('fill', function(d, i) {
            var index = dataset.data.indexOf(d);
            return 'rgb(' + dataset.data[index].color + ')';
          });
      });
  }

  function createViewButtonEvents() {
    svg.selectAll('.view-button-group')
      .on('mouseover', function(d, i) {
        d3.select(this).select('rect')
          .attr('fill', function(d) {
            return 'rgba(' + dataset.data[2].color + ', 0.4)';
          });
        d3.select(this).select('text')
          .attr('fill', 'black');
      })
      .on('mouseout', function(d, i) {
        d3.select(this).select('rect')
          .attr('fill', function(d) {
            return 'rgb(' + dataset.data[2].color + ')';
          });
        d3.select(this).select('text')
          .attr('fill', 'white');
      })
      .on('click', function(d, i) {
        event.preventDefault();
        console.log(d);
        // remove view button
        // insert new selected bar group
        // insert view button in previously selected bar group
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
      .domain([0, d3.max(dataset.data, function(d) {
        return d.value;
      })])
      .range([10, maxRange]);

    // Resize SVG
    svg.attr('width', w);

    // Resize Bar Labels
    svg.selectAll(".bar-label")
      .data(dataset.data)
      .transition()
      .delay(function(d, i) {
        return i / dataset.data.length * 1000;
      })
      .duration(150)
      .attr("x", function(d, i) {
        return startBarLabelPosition(d.value);
      });

    // Resize Bars
    svg.selectAll('.bar')
      .data(dataset.data)
      .transition()
      .delay(function(d, i) {
        return i / dataset.data.length * 1000;
      })
      .duration(200)
      .ease('linear')
      .attr('width', function(d) {
        return xScale(d.value);
      });
  };

  /* =======================================
      Chart Generation Functions
     ======================================= */

  function createChart() {
    selectedBarGroup();
    createBarGroups();
    createBarEvents();
    createViewButtonEvents();
    selectedBarGroup();
  }

  function createBarGroups() {
    var barGroups = svg.selectAll('.bar-group')
      .data(dataset.data)
      .enter()
      .append("g")
      .classed("bar-group", true);

    createBar(barGroups);
    createYAxisLabel(barGroups);
    createBarLabel(barGroups);
    createViewButton(barGroups);
    removeViewButton(barGroups);
  }

  // Create Bar
  function createBar(groupSelector) {
    groupSelector.append('rect')
      .classed('bar', true)
      .attr('x', viewButtonWidth + yAxisLabelWidth)
      .attr('y', function(d, i) {
        return yScale(i);
      })
      .attr('width', function(d) {
        return xScale(d.value);
      })
      .attr('height', yScale.rangeBand())
      .attr('fill', function(d, i) {
        return 'rgb(' + d.color + ')';
      });
  }

  // Create yAxis Labels
  function createYAxisLabel(groupSelector) {
    groupSelector.append("text")
      .classed('xAxis-label', true)
      .text(function(d, i) {
        return d.category;
      })
      .attr("x", 90 + viewButtonWidth)
      .attr("y", function(d, i) {
        return yScale(i) + (lineHeight / 2) + (yScale.rangeBand() / 2);
      })
      .attr("font-family", "sans-serif")
      .attr("font-size", "12px")
      .attr("fill", "black")
      .style({
        "text-anchor": "end"
      });
  }

  // Create Bar Labels
  function createBarLabel(groupSelector) {
    groupSelector.append("text")
      .classed('bar-label', true)
      .text(function(d, i) {
        return valueFormatter(d.value);
      })
      .attr("x", function(d, i) {
        return startBarLabelPosition(d.value);
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
  function createViewButton(groupSelector) {
    var viewButtonGroup = groupSelector.append("g")
      .classed("view-button-group", true)
      .style({
        'cursor': 'pointer'
      });

    // View Button Rectangle
    viewButtonGroup.append("rect")
      .classed('view-button', true)
      .attr("x", leftViewButtonPadding)
      .attr("y", function(d, i) {
        return yScale(i);
      })
      .attr("width", viewButtonWidth - rightViewButtonPadding)
      .attr("height", yScale.rangeBand())
      .attr("rx", 5)
      .attr("ry", 5)
      .attr("fill", function(d) {
        return 'rgb(' + dataset.data[2].color + ')';
      });

    // View Button Text
    viewButtonGroup.append("text")
      .classed('view-text', true)
      .text('View')
      .attr("x", (leftViewButtonPadding + (viewButtonWidth - rightViewButtonPadding)) / 2)
      .attr("y", function(d, i) {
        return yScale(i) + (lineHeight / 2) + (yScale.rangeBand() / 2);
      })
      .attr("font-family", "sans-serif")
      .attr("font-size", "12px")
      .attr("fill", "white")
      .attr("text-anchor", "middle");
  }

  // Remove Selected View Button
  function removeViewButton(groupSelector) {
    groupSelector.each(function(d, i) {
      if (i === dataset.selected) {
        d3.select(this).select('.view-button-group').remove();
      }
    })
  }

  // Selected Bar Group Rectangle
  function selectedBarGroup() {
    var selectedBarGroup = svg.selectAll('.selected-bar-group')
      .data([dataset.selected])
      .enter()
      .append("g")
      .classed("selected-bar-group", true)

    selectedBarGroup.append("rect")
      .classed('selected-bar-overlay', true)
      .attr("x", leftViewButtonPadding)
      .attr("y", function(d, i) {
        return yScale(d);
      })
      .attr("width", viewButtonWidth + yAxisLabelWidth - rightViewButtonPadding)
      .attr("height", yScale.rangeBand())
      .attr("rx", 5)
      .attr("ry", 5)
      .attr("fill", function(d) {
        return 'rgb(' + selectedColor + ')';
      });
  }

});