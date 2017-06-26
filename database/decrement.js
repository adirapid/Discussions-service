
module.exports = async function (decrementObj, decrementedField) {
  const res = await decrementObj.decrement(decrementedField);
  return res;
};
