/* eslint-disable no-throw-literal */

const models    = require("../models");

module.exports = async function (modelName, whereQuery, include = [], sort = [], sortBy = undefined) {
  try {
    const sortList = (typeof sort === "string") ? JSON.parse(sort) : sort;
    const includeArr = (typeof include === "string") ? JSON.parse(include) : include;
    const model = models[modelName];
    const res = await model.findOne({
      where: whereQuery,
      include: includeArr,
      order: sortList.map(sortArray => [sortBy].concat(sortArray))
    });
    return res;
  } catch (err) {
    throw {
      name: "db error",
      message: {
        status: 502,
        title: "Bad Gateway",
        details: `err in findOne: ${err.message}`
      }
    };
  }
};
