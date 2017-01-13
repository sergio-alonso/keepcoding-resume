//
// Resume Skills Map
//
// http://callbackhell.com/
// https://toddmotto.com/mastering-the-module-pattern/
//
var SkillsMap = (function () {
  var margin = { top: 10, right: 10, bottom: 10, left: 10 };
  var width = 650;
  var height = 950;
  var start_year = 2002;
  var end_year = 2017;
  var c = d3.scale.category20c();
  var _handleData = function (data) {
    var x = d3.scale.linear().range([0, width]);
    x.domain([start_year, end_year]);
    var xAxis = d3.svg.axis().scale(x).orient("top");
    var formatYears = d3.format("0000");
    xAxis.tickFormat(formatYears);
    svg.append("g").attr("class", "x axis")
      .attr("transform", "translate(0,-" + 10 + ")")
      .call(xAxis);
    var xScale = d3.scale.linear()
      .domain([start_year, end_year])
      .range([0, width]);
    for (var j = 0; j < data.length; j++) {
      var g = svg.append("g").attr("class", "skill");
      var circles = g.selectAll("circle")
        .data(data[j]['skills'])
        .enter()
        .append("circle");
      var rScale = d3.scale.linear()
        .domain([0, d3.max(data[j]['skills'], function (d) { return d[1]; })])
        .range([5, 9]);
      circles
        .attr("cx", function (d, i) { return xScale(d[0]); })
        .attr("cy", j * 20 + 20)
        .attr("r", function (d) { return rScale(d[1]); })
        .style("fill", function (d) { return c(j); });
      g.append("text")
        .attr("y", j * 20 + 25)
        .attr("x", width + 20)
        .attr("class", "label")
        .text(_truncate(data[j]['name'], 30, "..."))
        .style("fill", function (d) { return c(j); });
    }
  };
  var _truncate = function (str, maxLength, suffix) {
    if (str.length > maxLength) {
      str = str.substring(0, maxLength + 1);
      str = str.substring(0, Math.min(str.length, str.lastIndexOf(" ")));
      str = str + suffix;
    }
    return str;
  };
  var draw = function (id, json) {
    svg = d3.select(id).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .style("margin-left", margin.left + "px")
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    d3.json(json, _handleData);
  };
  return {
    draw: draw
  };
})();
//d3.json(this.json, function (data) {
// 
//    }
