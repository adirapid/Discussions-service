/**
 * @function getIssuesByAuthor
 * @memberOf issues
 * @param authorId the issues owner id
 * @param sort The order of the issues.
 * @param offset The starting point from where to get the issues.
 * @param limit The max number of issues to get.
 * @description Get [limit] issues starting from [offset] belong to the user and order it by [sort].
 * <p><i> GET /v2/issues/author/:authorId </i></p>
 * @returns res contains all author's issues.
 * <p></p>
 */

const getIssuesBy = require("./getIssuesBy");
const getErrResponse  = require("../../utils/getErrResponse");
const logger          = require("../../utils/logger");

module.exports = async function (req, res) {
  const startTime = Date.now();
  try {
    const { authorId } = req.params;
    const { sort, limit, offset } = req.query;
    const limitParse = parseInt(limit) || 5;// fix and check user params!
    const offsetParse = parseInt(offset) || 0;
    await getIssuesBy({ userId: authorId }, offsetParse, limitParse, sort, req.url, res, startTime);
  } catch (err) {
    const errResponse = getErrResponse({ status: 500, source: req.url, title: "Server Error", details: err.message });
    res.status(500).send({ errors: [errResponse], total: 0, took: (Date.now() - startTime) });
    logger.error(`Server Error: ${err.message}`);
  }
};

