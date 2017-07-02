/**
 * @function getIssues
 * @memberOf issues
 * @param sort The order of the issues.
 * @param limit The max number of issues to get.
 * @param offset The starting point from where to get the issues.
 * @description get issues in sort [sort] with [limit] and [offset]
 * <p><i> GET /v2/issues </i></p>
 * @returns res contains all requested issues.
 * <p></p>
 */

const getIssuesBy = require("./getIssuesBy");
const getErrResponse  = require("../../utils/getErrResponse");
const logger          = require("../../utils/logger");

module.exports = async function (req, res) {
  const startTime = Date.now();
  try {
    const { sort, limit, offset } = req.query;
    const limitParse = parseInt(limit) || 5;// fix and check user params!
    const offsetParse = parseInt(offset) || 0;
    await getIssuesBy({}, offsetParse, limitParse, sort, req.url, res, startTime);
  } catch (err) {
    const errResponse = getErrResponse({ status: 500, source: req.url, title: "Server Error", details: err.message });
    res.status(500).send({ errors: [errResponse], total: 0, took: (Date.now() - startTime) });
    logger.error(`Server Error: ${err.message}`);
  }
};
