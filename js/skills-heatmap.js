//
// Resume Skills Heatmap
//
// http://callbackhell.com/
// https://toddmotto.com/mastering-the-module-pattern/
//
var SkillsHeatmap = (function () {
  var startYear = 2001;
  var endYear = 2018;
  var width = 600;
  var height = 400;
  var margin = { top: 100, right: 100, bottom: 10, left: 100 };
  var gridSize = Math.floor(width / (endYear - startYear));
  var xScale = d3.scale.linear()
    .domain([startYear, endYear])
    .range([0, width]);
  var formatYears = d3.format("0000");
  var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("top")
    .tickFormat(formatYears);
  var colorScale = d3.scale.linear()
    .domain([1, 10])
    .range(['lightblue', 'darkblue']);
  var _handleData = function (data) {
    svg.append("g").attr("class", "axis")
      .attr("transform", "translate(" + (gridSize * 0.5) + "," + (gridSize * 0.2) + ")")
      .call(xAxis);
    for (var i = 0; i < data.length; i++) {
      var g = svg.append("g")
        .attr("class", "skill")
        .attr("transform", "translate(0," + (gridSize * 0.4) + ")");
      var rects = g.selectAll("rect")
        .data(data[i]['skills'])
        .enter()
        .append("rect")
        .attr("x", function (d) { return xScale(d[0]); })
        .attr("y", i * gridSize)
        .attr("width", gridSize - (gridSize * 0.01))
        .attr("height", gridSize - (gridSize * 0.01))
        .style("fill", function (d) { return colorScale(d[1]); });
      g.append("text")
        .attr("x", width + (gridSize * 1))
        .attr("y", i * gridSize + (gridSize * 0.5))
        .attr("class", "label")
        .text(data[i]['name']);
    }
  };
  var draw = function (id, json) {
    svg = d3.select(id).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    d3.json(json, _handleData);
  };
  return {
    draw: draw
  };
})();
