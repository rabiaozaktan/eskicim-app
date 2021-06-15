import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.publicPageSignin.onRendered(function () {
  // RandomBackground(this);
});

Template.publicPageSignin.events({
  'submit form': function (event, template) {
    event.preventDefault();
    LoadingSection.show(template, '.brd-loading-section');
    const identity = event.target.identity.value;
    const password = event.target.password.value;

    Meteor.loginWithPassword(identity, password, function (error) {
      LoadingSection.hide(template, '.brd-loading-section');

      if (error) {
        ErrorHandler.show(error);
        return;
      }

      if (Roles.userIsInRole(Meteor.userId(), ['roles.admin'])) {
        FlowRouter.go('/admin/home');
      } else if (Roles.userIsInRole(Meteor.userId(), ['roles.customer'])) {
        FlowRouter.go('/customer/home');
      } else if (Roles.userIsInRole(Meteor.userId(), ['roles.receiver'])) {
        FlowRouter.go('/receiver/home');
      }
    });
  }
});