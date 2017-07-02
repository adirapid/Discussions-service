/* eslint-disable no-throw-literal */
module.exports = async function (incrementObj, incrementedField) {
  try {
    const res = await incrementObj.increment(incrementedField);
    return res;
  } catch (err) {
    throw {
      name: "db error",
      message: {
        status: 502,
        title: "Bad Gateway",
        details: `err in increment: ${err.message}`
      }
    };
  }
};
