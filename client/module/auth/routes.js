import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { FlowRouterMeta, FlowRouterTitle } from 'meteor/ostrio:flow-router-meta';

const routesAuth = FlowRouter.group({
  prefix: '/auth',
  name: 'auth',
  triggersEnter: [MustSignOut]
});

routesAuth.route('/signin', {
  name: 'signin',
  action: function (params, queryParams) {
    this.render('authLayoutDefault', 'publicPageSignin', { page: 'publicPageSignin' });
  }
});

routesAuth.route('/signup', {
  name: 'signin',
  action: function (params, queryParams) {
    this.render('authLayoutDefault', 'publicPageSignup', { page: 'publicPageSignup' });
  }
});

routesAuth.route('/forgot-password', {
  name: 'forgor-password',
  action: function (params, queryParams) {
    this.render('authLayoutDefault', 'publicPageForgotPassword', { page: 'publicPageForgotPassword' });
  }
});

routesAuth.route('/forgot-password-verify', {
  action: function (params, queryParams) {
    this.render('authLayoutDefault', 'publicPageForgotPasswordVerify', { page: 'publicPageForgotPasswordVerify' });
  }
});

FlowRouter.route('/auth/set-password', {
  action: function (params, queryParams) {
    this.render('authLayoutDefault', 'publicPageSetPassword', { page: 'publicPageSetPassword' });
  }
});

FlowRouter.route('/auth/verify-email', {
  action: function (params, queryParams) {
    this.render('authLayoutDefault', 'publicPageVerifyEmail', { page: 'publicPageVerifyEmail' });
  }
});

FlowRouter.route('*', {
  name: 'notFound',
  action() {
    // Show 404 error page
    if (Meteor.user()) {

      if (Roles.userIsInRole(Meteor.userId(), ['roles.admin'])) {
        FlowRouter.go('/admin/home')
      } else if (Roles.userIsInRole(Meteor.userId(), ['roles.customer'])) {
        FlowRouter.go('/customer/home')
      } else if (Roles.userIsInRole(Meteor.userId(), ['roles.receiver'])) {
        FlowRouter.go('/receiver/home')
      }

    } else {
      FlowRouter.go('/auth/signin')
    }
  }
});

new FlowRouterMeta(FlowRouter);
new FlowRouterTitle(FlowRouter);