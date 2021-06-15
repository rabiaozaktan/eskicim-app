Fetch = function (_collection, _query, _options, wrapperFieldName = 'data') {
  const result = {
    options: {
      pagination: {},
      sorting: {}
    }
  };

  result[wrapperFieldName] = [];

  let query = _query;

  if (_options?.filters) {
    const filterQuery = Object.keys(_options.filters).reduce(function (obj, key) {

      const _f = [];
      _options.filters[key].forEach(f => {
        if (f.checked) {
          _f.push(f.field);
        }
      });

      obj[key] = {
        $in: _f,
      };

      return obj;
    }, {});

    query = { ...filterQuery, ...query };
  }

  if (_options?.filtering) {
    const $or = []
    Object.keys(_options.filtering).reduce(function (obj, key) {
      let _obj = {};

      _obj[key] = {
        $regex: `${_options.filtering[key]}`,
        $options: 'i'
      };
      $or.push(_obj);
    }, {});

    query = { ...{ $or: $or }, ...query };
  }

  const count = _collection.find(query).count();
  result.options.pagination.currentPage = 1;
  result.options.pagination.pageItems = count;
  result.options.pagination.totalCount = count;

  const options = {};

  if (_options?.pagination) {
    options.skip = (_options.pagination.currentPage - 1) * _options.pagination.pageItems;
    options.limit = _options.pagination.pageItems;
    result.options.pagination.currentPage = _options.pagination.currentPage;
    result.options.pagination.pageItems = _options.pagination.pageItems;
  }

  if (_options?.sorting) {
    options.sort = {};
    options.sort[_options.sorting.field] = _options.sorting.order;
    result.options.sorting = _options.sorting;
  }

  result[wrapperFieldName] = _collection.find(query, options).fetch();

  return result;
};

FetchAggregate = function (_collection, _pipeline, _options, wrapperFieldName = 'data') {
  const result = {
    options: {
      pagination: {},
      sorting: {}
    }
  };

  result[wrapperFieldName] = [];

  let pipeline = _pipeline;

  if (_options?.filters) {
    const filterQuery = Object.keys(_options.filters).reduce(function (obj, key) {

      const _f = [];
      _options.filters[key].forEach(f => {
        if (f.checked) {
          _f.push(f.field);
        }
      });

      obj[key] = {
        $in: _f,
      };

      return obj;
    }, {});

    pipeline.push({ $match: filterQuery });
  }

  if (_options?.filtering) {
    const $or = []
    Object.keys(_options.filtering).reduce(function (obj, key) {
      let _obj = {};

      _obj[key] = {
        $regex: `${_options.filtering[key]}`,
        $options: 'i'
      };
      $or.push(_obj);
    }, {});

    pipeline.push({ $match: { $or: $or } });
  }

  pipeline.push({ $count: "count" });
  const count = _collection.aggregate(pipeline)[0]?.count;

  result.options.pagination.currentPage = 1;
  result.options.pagination.pageItems = count || _options?.pagination?.pageItems || 0;
  result.options.pagination.totalCount = count || 0;
  pipeline.splice(-1, 1); // son eklenen count değeri siliniyor.

  if (!count) // count undefined ise zaten sonuç yoktur sorguyu bitiriyorum.
    return result;

  if (_options?.sorting) {
    const sort = {}

    sort[_options.sorting.field] = _options.sorting.order;

    pipeline.push({ $sort: sort });
    result.options.sorting = sort;
  }

  if (_options?.pagination) {

    pipeline.push({ $skip: (_options.pagination.currentPage - 1) * _options.pagination.pageItems });
    pipeline.push({ $limit: _options.pagination.pageItems });

    result.options.pagination.currentPage = _options.pagination.currentPage;
    result.options.pagination.pageItems = _options.pagination.pageItems;
  }

  result[wrapperFieldName] = _collection.aggregate(pipeline);
  return result;
};