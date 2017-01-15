//
// Resume work slider
//
function WorkSlider(id) {
  var sliderItems = $('<ul/>');
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
