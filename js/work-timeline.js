//
// Resume Work Timeline
//
function WorkTimeline(id) {
  var timelineData = [];
  var loadData = function (data) {
    $.each(data, function (i, item) {
      var start = roundYear(new Date(item.startDate));
      var end = roundYear(new Date(item.endDate));
      if (!end) {
        end = new Date().getFullYear();
      }
      timelineData.push(JSON.parse('{ "name": "' + item.position + '", "start": ' + start + ', "end": ' + end + ' }'));
    });
    new timeline(id, timelineData).draw();
  };
  var load = function (jsonUrl) {
    $.getJSON(jsonUrl, loadData);
  };
  return {
    load: load
  };
}
