$("document").ready(function ($) {
  var offsets = $('nav').offset().top;
  $(window).bind('scroll', function () {
    if ($(window).scrollTop() > offsets) {
      $("nav").css({ top: '1em', position: 'fixed' });
    } else {
      $("nav").css({ top: '6em', position: 'fixed' });
    }
  });
});
