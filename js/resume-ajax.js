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
// Round to nearest year
//
// 1980-02 -> 1980
// 1980-08 -> 1981
//
function roundYear(date) {
  y = date.getFullYear();
  m = date.getMonth();
  if (6 < m) {
    y++;
  }
  return y;
}
//
// Structure JSON work data into HTML elements
//
var loadWork = function (data) {
  var sliderItems = $('<ul/>');
  $.each(data, function (i, item) {
    var start = roundYear(new Date(item.startDate));
    var end = roundYear(new Date(item.endDate));
    if (!end) {
      end = new Date().getFullYear();
    }
    var work = $('<li/>', {
      html: start + "-" + end + " " + item.position + " <a href='http://" + item.website + "' target='_blank'>" + item.company +
        "</a><br/>" +
        item
        .summary
    });
    sliderItems.prepend(work);
  });
  var slider = $('<div/>', { class: "slider-content", html: sliderItems });
  $("#work .slider").append(slider);
  contentSlider.init();
};
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
  //$.getJSON(urlWork, loadWork);
  WorkTimeline("work-timeline").load("http://localhost:3000/work");
  SkillsHeatmap.draw("#skills-heatmap", "resume-skills.json");
});
