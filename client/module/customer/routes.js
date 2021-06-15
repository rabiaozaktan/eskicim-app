import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { FlowRouterMeta, FlowRouterTitle } from 'meteor/ostrio:flow-router-meta';

const routesAuth = FlowRouter.group({
  prefix: '/customer',
  name: 'customer',
  triggersEnter: [MustSignIn]
});

routesAuth.route('/home', {
  name: 'home',
  action: function (params, queryParams) {
    this.render('customerLayoutDefault', 'customerPageHome', { page: 'customerPageHome' });
  }
});

routesAuth.route('/announcements', {
  name: 'announcements',
  action: function (params, queryParams) {
    this.render('customerLayoutDefault', 'customerPageAnnouncement', { page: 'customerPageAnnouncement' });
  }
});

routesAuth.route('/profile', {
  name: 'profile',
  action: function (params, queryParams) {
    this.render('customerLayoutDefault', 'customerPageProfile', { page: 'customerPageProfile' });
  }
});

new FlowRouterMeta(FlowRouter);
new FlowRouterTitle(FlowRouter);