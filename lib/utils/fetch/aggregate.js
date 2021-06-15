Aggregate = {
  addLookup: function (pipeline, from, localField, foreignField, path, preserveNullAndEmptyArrays = false) {

    pipeline.push(
      {
        $lookup: {
          from: from,
          localField: localField,
          foreignField: foreignField,
          as: path
        },
      },
      {
        $unwind: {
          path: `$${path}`,
          preserveNullAndEmptyArrays: preserveNullAndEmptyArrays
        }
      });
  },

  createProject: function (pipeline, fields) {

    const $project = {
      _id: 1,
    }

    fields.forEach(field => {

      if (typeof field === 'object') {

        const key = Object.keys(field)[0];

        const _in = { _id: "$$u._id" };
        const obj = {
          $let: {
            vars: {
              u: `$${key}`
            },
            in: _in,
          },
        }

        field[key].forEach(f => {
          _in[f] = `$$u.${f}`
        });

        $project[key] = obj

      } else {
        $project[field] = 1;
      }

    });

    pipeline.push({ $project: $project })
  },
}