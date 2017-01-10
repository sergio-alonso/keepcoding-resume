//
// jQuery smooth scroll
//
// Navigate between "panels" on key up/down 
//
$(document).ready(function () {
  $(".panel").first().addClass("active");

  function scrollUp() {
    var current = $(".panel.active");
    current.removeClass("active");
    var next = $(".panel").eq(current.index() - 1);
    next.addClass("active");
    $(document.body).animate({
      'scrollTop': next.offset().top
    }, 500);
  }

  function scrollDown() {
    var current = $(".panel.active");
    current.removeClass("active");
    var next = $(".panel").eq(current.index() + 1);
    if (next.length < 1) {
      next = $(".panel").first();
    }
    next.addClass("active");
    $(document.body).animate({
      'scrollTop': next.offset().top
    }, 500);
  }
  //
  // Binding arrow keys
  $(document).keydown(function (e) {
    switch (e.which) {
    case 38:
      scrollUp();
      break;
    case 40:
      scrollDown();
      break;
    default:
      return;
    }
    e.preventDefault();
  });
});
