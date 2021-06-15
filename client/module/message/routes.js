import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { FlowRouterMeta, FlowRouterTitle } from 'meteor/ostrio:flow-router-meta';

const routesAuth = FlowRouter.group({
  prefix: '/message',
  name: 'message',
  triggersEnter: [MustSignIn]
});

routesAuth.route('/home/:channelId', {
  name: 'home',
  action: function (params, queryParams) {
    this.render('messageLayoutDefault', 'messagePageHome', { page: 'messagePageHome' });
  }
});

new FlowRouterMeta(FlowRouter);
new FlowRouterTitle(FlowRouter);