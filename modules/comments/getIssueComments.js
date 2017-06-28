/**
 * @function getIssueComments
 * @memberOf comments
 * @param questionId The question id.
 * @param sort The sort of the comments.
 * @param offset The starting point from where to get the commments.
 * @param limit The max number of comments to get.
 * @description Get [limit] comments starting from [offset] belong to the issue and sort it by [sort].
 * <p><i>GET /v2/issue/:id/comments</i></p>
 * @returns res contains all issues comments.
 * <p></p>
 */

const Database        = require("../../database");
const getErrResponse  = require("../../utils/getErrResponse");
const logger          = require("../../utils/logger");

module.exports = async function (req, res) {
  const startTime = Date.now();
  const { issueId } = req.params;
  const { sort, offset, limit } =  req.query;

  const limitParse = parseInt(limit) || 5; // fix and check user params!
  const offsetParse = parseInt(offset) || 0;
  const query = { issueId, status: "active" };
  try {
    const comments = await Database.findAll("Comments", query, false, limitParse, offsetParse, sort);
    if (typeof comments === "object") {
      if (comments.count > 0) { // comments were found
        res.status(200).send({ data: comments.rows, took: (Date.now() - startTime), total: comments.count });
      } else { // no comments
        const errResponse = getErrResponse({ status: 404,
          source: req.url,
          title: "Not Found",
          details: "no comments where found for the issue" });
        res.status(404).send({ errors: [errResponse], total: 0, took: (Date.now() - startTime) });
        logger.error(`no comments were found for issue ${issueId} `);
      }
    } else { // db err
      const errResponse = getErrResponse({ status: 502, source: req.url, title: "Bad Gateway", details: comments });
      res.status(502).send({ errors: [errResponse], total: 0, took: (Date.now() - startTime) });
      logger.error(`Bad gateway - error fetching db. req: ${req.url}`);
    }
  } catch (err) {
    const errResponse = getErrResponse({ status: 500, source: req.url, title: "Server Error", details: err.message });
    res.status(500).send({ errors: [errResponse], total: 0, took: (Date.now() - startTime) });
    logger.error(`Server Error: ${err.message}`);
  }
};
