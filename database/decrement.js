
module.exports = async function (decrementObj, decrementedField) {
  try {
    const res = await decrementObj.decrement(decrementedField);
    return res;
  } catch (err) {
    return err.message;
  }
};
