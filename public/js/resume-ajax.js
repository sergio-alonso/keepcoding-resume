//
// Asynchronous JavaScript and XML
//
// http://api.jquery.com/category/ajax/
//
// The jQuery library has a full suite of Ajax capabilities.
// The functions and methods therein allow us to load data from the server without a browser page refresh.
//
var url = "http://" + location.host + "/db";
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
  WorkSlider("#work-slider").load("http://" + location.host + "/work");
  WorkTimeline("#work-timeline").load("http://" + location.host + "/work");
  SkillsHeatmap("#skills-heatmap").load("../resume-skills.json");
});
//
// Post data to JSON server
//
$(document).ready(function () {
  jQuery(document).submit(function (e) {
    var form = jQuery(e.target);
    if (form.is(".hire-me-form")) { // check if this is the form that you want (delete this check to apply this to all forms)
      e.preventDefault();
      jQuery.ajax({
        type: "POST",
        url: "http://" + location.host + "/message",
        dataType: 'json',
        data: form.serialize(), // serializes the form's elements.
        success: function (data) {
          alert("Thanks, I'll be in touch soon.");
        }
      });
    }
  });
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
