$(document).ready(function() {

  // Attributes
  var w = 600;
  var h = 250;
  var barPadding = 1;
  var padding = 30;

  var svg = d3.select('.container')
    .append('svg')
    .attr('width', w)
    .attr('height', h);

  // Data
  var dataset = [5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25];

  // Scales
  var xScale = d3.scale.ordinal()
    .domain(d3.range(dataset.length))
    .rangeRoundBands([0, w], 0.05);

  var yScale = d3.scale.linear()
    .domain([0, d3.max(dataset)])
    .range([0, h]);

  // Axes

  // Create Bars
  svg.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .classed('bar', true)
    .attr('x', function(d, i) {
      return xScale(i);
    })
    .attr('y', function(d) {
      return h - yScale(d);
    })
    .attr('width', xScale.rangeBand())
    .attr('height', function(d) {
      return yScale(d);
    })
    .attr('fill', function(d) {
      return 'rgb(0, ' + (d * 10) + ', 0)';
    });

  // Create Bar Labels
  svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function(d) {
      return d;
    })
    .attr("x", function(d, i) {
      return xScale(i) + xScale.rangeBand() / 2;
    })
    .attr("y", function(d) {
      return h - yScale(d) + 14;
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "white")
    .attr("text-anchor", "middle");

  // Bar Click Event Listener
  d3.selectAll('.bar')
    .on('contextmenu', function(d, i) {
      event.preventDefault();
      //New values for dataset
      var numValues = dataset.length; //Count original length of dataset
      dataset = []; //Initialize empty array
      for (var i = 0; i < numValues; i++) { //Loop numValues times
        var newNumber = Math.floor(Math.random() * 25); //New random integer (0-25)
        dataset.push(newNumber); //Add new number to array
      }

      svg.selectAll('rect')
        .data(dataset)
        .transition()
        .delay(function(d, i) {
          return i / dataset.length * 1000;
        })
        .duration(200)
        .ease('linear')
        .attr('y', function(d) {
          return h - yScale(d);
        })
        .attr('height', function(d) {
          return yScale(d);
        })
        .attr('fill', function(d) {
          return 'rgb(0, ' + (d * 10) + ', 0)';
        });

      svg.selectAll('text')
        .data(dataset)
        .text(function(d) {
          return d;
        })
        .attr('x', function(d, i) {
          return xScale(i) + xScale.rangeBand() / 2;
        })
        .attr('y', function(d) {
          return h - yScale(d) + 14;
        });
    });


  // Data
  // var dataset = [];
  // var numDataPoints = 50;
  // var xRange = Math.random() * 1000;
  // var yRange = Math.random() * 1000;
  // for (var i = 0; i < numDataPoints; i++) {
  //   var newNumber1 = Math.floor(Math.random() * xRange);
  //   var newNumber2 = Math.floor(Math.random() * yRange);
  //   dataset.push([newNumber1, newNumber2]);
  // }

  // Scales
  // var xScale = d3.scale.linear()
  //   .domain([0, d3.max(dataset, function(d) { return d[0]; })])
  //   .range([padding, w - padding * 2]);

  // var yScale = d3.scale.linear()
  //   .domain([0, d3.max(dataset, function(d) { return d[1]; })])
  //   .range([h - padding, padding]);

  // var rScale = d3.scale.linear()
  //   .domain([0, d3.max(dataset, function(d) { return d[1]; })])
  //   .range([2, 5]);

  // // Axes
  // var xAxis = d3.svg.axis()
  //   .scale(xScale)
  //   .orient('bottom')
  //   .ticks(5);

  // var yAxis = d3.svg.axis()
  //   .scale(yScale)
  //   .orient('left')
  //   .ticks(5);
  // // SVG Scatterplot
  // var svg = d3.select('.container')
  //   .append('svg')
  //   .attr('width', w)
  //   .attr('height', h);

  // svg.selectAll('circle')
  //   .data(dataset)
  //   .enter()
  //   .append('circle')
  //   .attr('cx', function(d) {
  //     return xScale(d[0]);
  //   })
  //   .attr('cy', function(d) {
  //     return yScale(d[1]);
  //   })
  //   .attr('r', function(d) {
  //     return rScale(d[1]);
  //   });

  // svg.selectAll('text')
  //   .data(dataset)
  //   .enter()
  //   .append("text")
  //   .text(function(d) {
  //     return d[0] + ', ' + d[1];
  //   })
  //   .attr('x', function(d) {
  //     return xScale(d[0]);
  //   })
  //   .attr('y', function(d) {
  //     return yScale(d[1]);
  //   })
  //   .attr("font-family", "sans-serif")
  //   .attr("font-size", "11px")
  //   .attr("fill", "red");

  // svg.append('g')
  //   .attr('class', 'axis') // Assign 'axis' class
  //   .attr('transform', 'translate(0,' + (h - padding) + ')')
  //   .call(xAxis);

  // svg.append('g')
  //   .attr('class', 'axis') // Assign 'axis' class
  //   .attr('transform', 'translate(' + padding + ', 0)')
  //   .call(yAxis);

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