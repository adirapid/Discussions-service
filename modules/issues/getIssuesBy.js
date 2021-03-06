/**
 * @function getIssuesBy
 * @memberOf issues
 * @param sort The order of the issues (array of sorts).
 * @param limit The max number of issues to get.
 * @param offset The starting point from where to get the issues.
 * @param by the parameter to get the issuse by.
 * @description get issues in order [order] with [limit] and [offset]
 * @returns res contains all requested issues.
 * <p></p>
 */

const Database        = require("../../database");
const getErrResponse  = require("../../utils/getErrResponse");
const logger          = require("../../utils/logger");
const models          = require("../../models");

module.exports = async function (query, offset, limit, sort, reqUrl, res, time) {
  query.status = "active";
  try {
    const issues = await Database.findAll("Issues", query, false, offset, limit, sort, [{ model: models.Comments }]);
    res.status(200).send({ data: issues.rows, total: issues.rows.length, took: Date.now() - time });
  } catch (err) {
    if (err.name === "db error") {
      err.message.source = reqUrl;
      const errResponse = getErrResponse(err.message);
      res.status(502).send({ errors: [errResponse], total: 0, took: (Date.now() - time) });
      logger.error(`Bad gateway - error fetching db. req: ${reqUrl}`);
    } else {
      const errResponse = getErrResponse({ status: 500, source: reqUrl, title: "Server Error", details: err.message });
      res.status(500).send({ errors: [errResponse], total: 0, took: (Date.now() - time) });
      logger.error(`Server Error: ${err.message}`);
    }
  }
};

