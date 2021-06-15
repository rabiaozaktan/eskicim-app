import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { FlowRouterMeta, FlowRouterTitle } from 'meteor/ostrio:flow-router-meta';

const routesAuth = FlowRouter.group({
  prefix: '/admin',
  name: 'admin',
  triggersEnter: [MustSignIn]
});

routesAuth.route('/home', {
  name: 'home',
  action: function (params, queryParams) {
    this.render('adminLayoutDefault', 'adminPageHome', { page: 'adminPageHome' });
  }
});

new FlowRouterMeta(FlowRouter);
new FlowRouterTitle(FlowRouter);