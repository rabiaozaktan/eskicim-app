import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.customerPageProfile.events({
  'click .brd-log-out': function (event, template) {
    event.preventDefault();
    Meteor.logout(function () {
      FlowRouter.go('/auth/signin');
    });
  }
});