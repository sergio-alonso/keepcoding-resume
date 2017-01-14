//
// Asynchronous JavaScript and XML
//
// http://api.jquery.com/category/ajax/
//
// The jQuery library has a full suite of Ajax capabilities.
// The functions and methods therein allow us to load data from the server without a browser page refresh.
//
var url = "http://localhost:3000/db";
var url_work = "http://localhost:3000/work";
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
  $.getJSON(url_work, function (data) {
    var timelineData = [];
    var slider_items = $('<ul/>');
    $.each(data, function (i, item) {
      var experience = $('<li/>', {
        html: item.startDate + " " + item.position + " at <a href='http://" + item.website + "' target='_blank'>" + item.company +
          "</a><br/>" +
          item
          .summary
      });
      slider_items.prepend(experience);
      var start = new Date(item.startDate).getFullYear();
      var end = new Date(item.endDate).getFullYear();
      if (!end) {
        end = new Date().getFullYear();
      }
      timelineData.push(JSON.parse('{ "name": "' + item.position + '", "start": ' + start + ', "end": ' + end + ' }'));
    });
    var slider = $('<div/>', { class: "slider-content", html: slider_items });
    $("#experience .slider").append(slider);
    contentSlider.init();
    var tl = new timeline("timeline", timelineData);
    tl.draw();
  });
  //$(window).resize(function () {
  //tl.redraw();
  //});
  SkillsMap.draw("#skills-map", "resume-skills.json");
});
