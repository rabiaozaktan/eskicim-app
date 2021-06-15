import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

MustSignIn = function (context, redirect, stop) {
  if (!Meteor.userId()) {
    redirect('/auth/signin');
    stop();
  }
}

MustSignOut = function (context, redirect, stop) {
  if (Meteor.userId()) {
    redirect('/');
    stop();
  }
}

/**
 * Bu must kullanıcının admin olup olmadığını kontrol ediyor. Ancak admin sayfasında iseniz ve tekrar yüklerseniz sizi
 * dışarı atıyor. 
 * 
 */
IsAdmin = function (context, redirect, stop) {
  if (!Roles.userIsInRole(Meteor.userId(), ['roles.admin'])) {
    redirect('/');
    stop();
  }
}

FlowRouter.wait();
Tracker.autorun(() => {
  if (Roles.subscription.ready() && !FlowRouter._initialized) {
    FlowRouter.initialize();
  }
});


// MustPlaidWaiting = function (context, redirect, stop) {
//   // TODO: Kullanici plaid hesabini onaylamissa dashboard'a yonlendir
// }

// MustPlaidConfirmed = function (context, redirect, stop) {
//   // TODO: Kullanici plaid hesabini onaylamamissa conform ekranina yonlendir.
// }

// MustCreditWaiting = function (context, redirect, stop) {
//   // TODO: Kullanici plaid hesabini onaylamissa dashboard'a yonlendir
// }

// MustCreditAccepted = function (context, redirect, stop) {
//   // TODO: Kullanici plaid hesabini onaylamamissa conform ekranina yonlendir.
// }