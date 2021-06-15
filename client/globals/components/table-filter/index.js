Template.componentsTableFilter.helpers({
  filterList: function (list, key) {
    if (!list || !key) {
      return []
    }
    return list[key];
  }
});

Template.componentsTableFilter.events({
  'click .brd-table-filter': function (event, template) {
    event.preventDefault();
    event.stopPropagation();

    const filters = template.data.filters.get();
    const key = template.data.key;
    const filter = this;

    const i = filters[key].findIndex(f => {
      return f.field == filter.field;
    });

    filters[key][i].checked = filters[key][i].checked ? false : true;
    template.data.filters.set(filters);
  }
});