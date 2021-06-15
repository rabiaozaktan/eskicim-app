let timeout;
Template.componentsTableSearcher.events({
  'keyup .brd-application-search': function (event, template) {
    event.stopImmediatePropagation();
    const search = event.target.value;

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(function () {
      const filtering = template.data.filtering.all();

      const filterQuery = Object.keys(filtering).reduce(function (obj, key) {
        obj[key] = search;
        return obj;
      }, {});

      template.data.filtering.set(filterQuery);
    }, 700);
  }
});