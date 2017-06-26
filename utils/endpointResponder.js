const codes = {
  GET: {
    OK: 200,
    BAD: 400,
    NOT_FOUND: 404,
  },
  POST: {
    OK: 201,
    BAD: 400
  },
  DELETE: {
    OK: 204,
    BAD: 400,
    NOT_FOUND: 404
  },
  PATCH: {
    OK: 204,
    BAD: 400,
    NOT_FOUND: 404,
    NOT_ALLOWED: 405
  }
};

const errorTitles = {
  400: "Bad request",
  404: "Resource not found"
};

function response(code, method, data) {
  if (code < 200 || code <= 400) {
    return {
      errors: [
        {
          status: code,
          title: errorTitles[code] || "",
          description: data
        }
      ]
    };
  }
  switch (method) {
  case "GET":
  case "POST":
    if ((Array.isArray(data) && data.length < 2)) return { data: data[0] };
    return { data };
  default:
    return {};
  }
}

async function endpointResponder(req, res, callback) {
  try {
    const { body, query, params, method } = req;
    const { status, data } = await callback({ body, query, params });
    const code = codes[method][status.toUpperCase()];
    const resp = response(code, method, data);
    res.status(code).send(resp);
  } catch (ex) {
    const errors = [
      {
        status: 500,
        title: ex.name,
        detail: ex.message
      }
    ];
    res.status(500).send({ errors });
  }
}

module.exports = endpointResponder;
