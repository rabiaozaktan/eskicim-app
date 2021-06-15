Template.customerPageHome.onCreated(function () {
  this.state = new ReactiveDict(null, {
    announcements: [],
    notFound: false
  });

  this.pagination = new ReactiveDict(null, {
    currentPage: 1,
    pageItems: 10,
    totalCount: 0,
    totalPages: 0
  });
});

Template.customerPageHome.onRendered(function () {
  const self = this;

  this.autorun(function () {
    LoadingSection.hide(self, '.loading-temp');
    Meteor.call('customer.announcements.list', {}, function (error, result) {
      LoadingSection.hide(self, '.loading-temp');
      if (error) {
        ErrorHandler.show(error);
        return;
      }

      self.state.set('announcements', result.announcements);
      self.state.set('notFound', result.options.pagination.totalCount === 0);
      self.pagination.set('currentPage', result.options.pagination.currentPage);
      self.pagination.set('pageItems', result.options.pagination.pageItems);
      self.pagination.set('totalCount', result.options.pagination.totalCount);
      self.pagination.set('totalPages', result.options.pagination.totalPages);
    });
  });
});