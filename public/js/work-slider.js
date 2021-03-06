//
// Resume work slider
//
function WorkSlider(id) {
  var sliderItems = $('<ul/>', { class: "slider-items" });
  //
  // Structure JSON work data into HTML elements
  //
  var loadItems = function (i, item) {
    var start = roundYear(new Date(item.startDate));
    var end = roundYear(new Date(item.endDate));
    if (!end) {
      end = new Date().getFullYear();
    }
    var date = $('<div/>', {
      text: start + "-" + end
    });
    var position = $('<div/>', {
      text: item.position
    });
    var company = $('<div />').append($('<a/>', {
      href: "http://" + item.website,
      target: "_blank",
      text: item.company
    }));
    var summary = $('<div/>', {
      text: item.summary
    });
    var highlightsContainer = $('<div />');
    var highlights = $('<ul/>').appendTo(highlightsContainer);
    $.each(item.highlights, function (i, item) {
      $('<li/>', { text: item }).appendTo(highlights);
    });
    var header = $('<div />', { class: 'slider-item-header' }).append(date).append(position).append(company);
    var content = $('<div />', { class: 'slider-item-content' }).append(summary).append(highlightsContainer);
    var work = $('<li/>', {
      class: "slider-item"
    }).append(header).append(content);
    sliderItems.prepend(work);
  };
  var loadData = function (data) {
    $.each(data, loadItems);
    var slider = $('<div/>', {
      class: "slider-content",
      html: sliderItems
    });
    $(id).append(slider);
    contentSlider.init();
  };
  var load = function (jsonUrl) {
    $.getJSON(jsonUrl, loadData);
  };
  return {
    load: load
  };
}
