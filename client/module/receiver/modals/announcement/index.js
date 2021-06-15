const { default: Swal } = require("sweetalert2");

Template.receiverModalAnnouncement.events({
  'click .brd-announcement-closed': function (event, template) {
    event.preventDefault();

    const announcement = AppUtil.temp.get('announcement')

    Meteor.call('receiver.announcements.closed', { id: announcement._id }, function (error, result) {
      if (error) {
        ErrorHandler.show(error);
        return;
      }

      Swal.fire({
        title: 'Başarılı',
        text: 'Kayıt başarılı',
        icon: 'success',
        confirmButtonText: 'Tamam'
      }).then(r => {
        AppUtil.refreshTokens.set('announcements', Random.id());
        $('#brdReceiverModalAnnouncement').modal('hide');
      });
    });
  }
});