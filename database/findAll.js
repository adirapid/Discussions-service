const models    = require("../models");

module.exports = async function (modelName, whereQuery = {},
  needRaw = false, offset = 0,
  limit = 0, order = [], include = []) {
  try {
    const orderArr = (typeof order === "string") ? JSON.parse(order) : order;
    const includeArr = (typeof include === "string") ? JSON.parse(include) : include;
    const model = models[modelName];
    const res = await model.findAndCountAll({
      where: whereQuery,
      raw: needRaw,
      offset,
      limit,
      order: orderArr,
      include: includeArr,
    });
    return res;
  } catch (err) {
    return err.message;
  }
};
