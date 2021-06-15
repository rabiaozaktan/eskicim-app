RandomBackground = function(template) {
  const bgImageUrl = Random.choice([
    '/assets/images/1-min.jpg',
    '/assets/images/2-min.jpg',
    '/assets/images/3-min.jpg',
    '/assets/images/4-min.jpg',
    '/assets/images/5-min.jpg',
    '/assets/images/6-min.jpg',
    '/assets/images/7-min.jpg',
    '/assets/images/8-min.jpg',
    '/assets/images/9-min.jpg',
    '/assets/images/10-min.jpg',
    '/assets/images/11-min.jpg',
  ]);

  template.$('.brd-random-bg').css('background-image', `url(${bgImageUrl})`);
}