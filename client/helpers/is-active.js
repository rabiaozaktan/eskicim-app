import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

IsActive = function (value, htmlClass = 'active') {
  let isActive = false;
  if (value == '/') {
    isActive = FlowRouter._current.path == '/' ? true : false;
  } else {
    isActive = FlowRouter._current.path.includes(value);
  }
  return isActive ? htmlClass : false
}

Template.registerHelper('_isActive', function (value, htmlClass) {
  FlowRouter.watchPathChange();
  return IsActive(value, htmlClass);
});