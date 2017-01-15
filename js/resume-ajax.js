//
// Asynchronous JavaScript and XML
//
// http://api.jquery.com/category/ajax/
//
// The jQuery library has a full suite of Ajax capabilities.
// The functions and methods therein allow us to load data from the server without a browser page refresh.
//
var url = "http://localhost:3000/db";
//
// Get data from JSON server
//
$(document).ready(function () {
  $.getJSON(url, function (data) {
    $("title").html(data.basics.name);
    $("header h1").html(data.basics.name);
    $("#what-i-do h2").html(data.basics.label);
    $("#what-i-do h3").html(data.basics.summary);
    email = $('<a/>', {
      href: "mailto:" + data.basics.email,
      html: data.basics.email
    });
    $("footer .email").html(email);
    website = $('<a/>', {
      href: "http://" + data.basics.website,
      html: data.basics.website
    });
    $("footer .website").html(website);
  });
  WorkSlider("#work-slider").load("http://localhost:3000/work");
  WorkTimeline("#work-timeline").load("http://localhost:3000/work");
  SkillsHeatmap("#skills-heatmap").load("resume-skills.json");
});
//
// Helper functions to handle dates and times
//
// Given a date, round to nearest year
//
// 1980-04-27 -> 1980
// 1980-08-01 -> 1981
//
function roundYear(date) {
  y = date.getFullYear();
  m = date.getMonth();
  if (6 < m) {
    y++;
  }
  return y;
}
