$("document").ready(function ($) {
  //
  // move nav to top on scroll
  //
  var offsets = $('nav').offset().top;
  $(window).bind('scroll', function () {
    if ($(window).scrollTop() > offsets) {
      $("nav").css({ top: '1em', position: 'fixed' });
    } else {
      $("nav").css({ top: '6em', position: 'fixed' });
    }
  });
  //
  // nav smooth scrool
  //
  $("nav ul li a").on('click', function (e) {
    var url = e.target.href;
    var hash = url.substring(url.indexOf("#") + 1);
    $('html, body').animate({
      scrollTop: $('#' + hash).offset().top
    }, 500);
    return false;
  });
});
