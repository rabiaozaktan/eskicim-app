goToAnimate = (input, h) => {
  $('html, body').animate({
    scrollTop: $(input).offset().top + h
  }, 150);
}