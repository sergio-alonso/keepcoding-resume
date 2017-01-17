// Dinamically add or remove a new input depending on select option
$(document).ready(function () {
  $("#hire-me form select").on('change', function () {
    if ("others" == this.value) {
      $("<input type='text' name='other' id='other' placeholder='How?' />").insertAfter(this);
    } else {
      $('#other').remove();
    }
    return false;
  });
});
