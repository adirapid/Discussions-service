
module.exports = async function (incrementObj, incrementedField) {
  const res = await incrementObj.increment(incrementedField);
  return res;
};
