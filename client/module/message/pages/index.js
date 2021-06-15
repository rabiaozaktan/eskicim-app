import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.messagePageHome.helpers({
  messages: function () {
    return Messages.find({}).fetch();
  },
});

Template.messagePageHome.onRendered(function () {
  const self = this;

  this.autorun(function () {
    const channelId = FlowRouter.getParam('channelId');

    if (!channelId) {
      return
    }

    self.subscription = Meteor.subscribe('messages', channelId, {
      onReady: function () {
        // LoadingSection.hide(self, '#brdChatComponentSessionsTabAll');
      }
    })
  });
});

Template.messagePageHome.onDestroyed(function () {
  this.subscription?.stop();
});

Template.messagePageHome.events({
  'click .brd-back': function (event, template) {
    event.preventDefault();
    history.go(-1);
  },
  
  'submit form': function (event, template) {
    event.preventDefault()

    const channelId = FlowRouter.getParam('channelId');
    const message = event.target.message.value;

    const obj = {
      message: {
        channelId: channelId,
        sendUserId: Meteor.userId(),
        message: message,
      }
    }

    LoadingSection.hide(self, '.loading-temp');
    Meteor.call('message.create', obj, function (error, result) {
      LoadingSection.hide(self, '.loading-temp');
      if (error) {
        ErrorHandler.show(error);
        return;
      }

      event.target.reset();
    });
  }
});