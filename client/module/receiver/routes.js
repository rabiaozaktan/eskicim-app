import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { FlowRouterMeta, FlowRouterTitle } from 'meteor/ostrio:flow-router-meta';

const routesAuth = FlowRouter.group({
  prefix: '/receiver',
  name: 'receiver',
  triggersEnter: [MustSignIn]
});

routesAuth.route('/home', {
  name: 'home',
  action: function (params, queryParams) {
    this.render('receiverLayoutDefault', 'receiverPageHome', { page: 'receiverPageHome' });
  }
});

routesAuth.route('/profile', {
  name: 'profile',
  action: function (params, queryParams) {
    this.render('receiverLayoutDefault', 'receiverPageProfile', { page: 'receiverPageProfile' });
  }
});

routesAuth.route('/announcements', {
  name: 'announcements',
  action: function (params, queryParams) {
    this.render('receiverLayoutDefault', 'receiverPageAnnouncement', { page: 'receiverPageAnnouncement' });
  }
});

new FlowRouterMeta(FlowRouter);
new FlowRouterTitle(FlowRouter);