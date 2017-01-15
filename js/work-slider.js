//
// Resume work slider
//
function WorkSlider(id) {
  var sliderItems = $('<ul/>');
  //
  // Structure JSON work data into HTML elements
  //
  var loadItems = function (i, item) {
    var start = roundYear(new Date(item.startDate));
    var end = roundYear(new Date(item.endDate));
    if (!end) {
      end = new Date().getFullYear();
    }
    var work = $('<li/>', {
      html: start + "-" + end + " " +
        item.position +
        " <a href='http://" + item.website + "' target='_blank'>" +
        item.company +
        "</a>" +
        "<br / > " +
        item.summary
    });
    sliderItems.prepend(work);
  };
  var loadData = function (data) {
    $.each(data, loadItems);
    var slider = $('<div/>', { class: "slider-content", html: sliderItems });
    $("#" + id).append(slider);
    contentSlider.init();
  };
  var load = function (jsonUrl) {
    $.getJSON(jsonUrl, loadData);
  };
  return {
    load: load
  };
}
