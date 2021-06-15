import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.publicPageSignup.onRendered(function () {
  // RandomBackground(this);
});

Template.publicPageSignup.events({
  'submit form': function (event, template) {
    event.preventDefault();
    Loading.show();
    ErrorHandler.reset(template);

    const firstname = event.target.firstname.value;
    const lastname = event.target.lastname.value;
    const identity = event.target.identity.value;
    const password = event.target.password.value;
    const phone = event.target.phone.value;
    const userType = event.target.userType.value;

    const obj = {
      email: identity,
      password: password,
      profile: {
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        type: userType
      }
    };

    Accounts.createUser(obj, function (_error, _result) {
      Loading.hide();

      if (_error) {
        ErrorHandler.show(_error);
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
})