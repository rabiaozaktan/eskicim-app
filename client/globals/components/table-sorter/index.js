Template.componentsTableSorter.events({
  'click .brd-table-sorter': function (event, template) {
    event.stopImmediatePropagation();

    const sorting = template.data.sorting.get();
    const key = template.data.key;
    const sort = { field: key, order: -1 };

    if (!sorting) {
      template.data.sorting.set(sort);
    } else {
      if (sorting.field == key) {
        sort.order = sorting.order == 1 ? -1 : 1;
        template.data.sorting.set(sort);
      } else {
        template.data.sorting.set(sort);
      }
    }
  }
});