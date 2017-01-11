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
    $("#aboutme h2").html(data.basics.label);
    $("#aboutme h3").html(data.basics.summary);
    $("footer .email").html(data.basics.email);
    $("footer .website").html(data.basics.website);
  });
  $.getJSON(url_work, function (data) {
    var slider_items = $('<ul/>');
    $.each(data, function (i, item) {
      var experience = $('<li/>', {
        html: item.startDate + " " + item.position + " at <a href='http://" + item.website + "'>" + item.company + "</a><br/>" +
          item
          .summary
      });
      slider_items.append(experience);
    });
    var slider = $('<div/>', { class: "slider-content", html: slider_items });
    $("#experience .slider").append(slider);
  });
});
