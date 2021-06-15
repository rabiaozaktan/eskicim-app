Template.customerComponentNavbar.events({
  'click .brd-back': function(event, template) {
    event.preventDefault();
    history.go(-1);
  }
});