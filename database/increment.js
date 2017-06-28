
module.exports = async function (incrementObj, incrementedField) {
  try {
    const res = await incrementObj.increment(incrementedField);
    return res;
  } catch (err) {
    return err.message;
  }
};
