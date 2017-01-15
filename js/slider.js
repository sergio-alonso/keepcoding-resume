var contentSlider = {
  init: function () {
    this.slider = $('.slider-content');
    this.items = this.slider.find('.slider-item');
    this.length = this.items.length;
    this.width = this.slider.outerWidth(true);
    this.wrapperWidth = this.length * this.width + 100;
    this.current = "-=" + (this.width * (this.length - 1));
    this.slider.parent().append("<button class='l' onclick='contentSlider.prev()'>&laquo;</button>");
    this.slider.parent().append("<button class='r' onclick='contentSlider.next()'>&raquo;</button>");
    this.slider.find('.slider-items').width(this.wrapperWidth);
    this.items.width(this.width);
    this.slider.find('.slider-item:last-child').addClass('active');
    this.slider.find('.slider-items').animate({
      left: this.current
    });
    this.bindKeys();
  },
  prev: function () {
    if (0 < this.slider.find('.slider-item.active').prev().length) {
      this.slider.find('.slider-item.active').removeClass('active').prev().addClass('active');
      this.current = "+=" + this.width;
    } else {
      this.current = "-=" + (this.width * (this.length - 1));
      this.slider.find('.slider-item.active').removeClass('active').parent().find('.slider-item:last-child').addClass('active');
    }
    this.slider.find('.slider-items').animate({
      left: this.current
    });
    return false;
  },
  next: function () {
    if (0 < this.slider.find('.slider-item.active').next().length) {
      this.slider.find('.slider-item.active').removeClass('active').next().addClass('active');
      this.current = "-=" + this.width;
    } else {
      this.current = null;
      this.slider.find('.slider-item.active').removeClass('active').parent().find('.slider-item:first-child').addClass('active');
    }
    this.slider.find('.slider-items').animate({
      left: this.current
    });
    return false;
  },
  bindKeys: function () {
    $(document).keydown(function (e) {
      switch (e.which) {
      case 37: // left
        contentSlider.prev();
        break;
      case 39: // right
        contentSlider.next();
        break;
      default:
        return;
      }
      e.preventDefault();
    });
  }
};
