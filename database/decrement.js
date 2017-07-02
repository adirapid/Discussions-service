/* eslint-disable no-throw-literal */
module.exports = async function (decrementObj, decrementedField) {
  try {
    const res = await decrementObj.decrement(decrementedField);
    return res;
  } catch (err) {
    throw {
      name: "db error",
      message: {
        status: 502,
        title: "Bad Gateway",
        details: `err in decrement: ${err.message}`
      }
    };
  }
};
