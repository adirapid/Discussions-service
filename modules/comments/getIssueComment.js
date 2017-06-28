/**
 * @function getIssueComment
 * @memberOf comments
 * @param issueId the issue id
 * @param commentId the comment id
 * @description get comment of an issue
 * <p><i> GET /v2/issue/:issueId/comment/:commentId </i></p>
 * @returns res contains all comment info and user info
 * <p></p>
 */

const Database        = require("../../database");
const getErrResponse  = require("../../utils/getErrResponse");
const logger          = require("../../utils/logger");

module.exports = async function (req, res) {
  const startTime = Date.now();
  const { issueId, commentId } = req.params;
  try {
    const comment = await Database.findOne("Comments", { issueId, id: commentId, status: "active" });
    if (typeof comment === "object") { // comment was found
      res.status(200).send({ data: comment, took: (Date.now() - startTime), total: 1 });
    } else if (!comment) { // comment doesn't exists
      const errResponse = getErrResponse({ status: 404,
        source: req.url,
        title: "Not Found",
        details: "comment doesn't exists" });
      res.status(404).send({ errors: [errResponse], total: 0, took: (Date.now() - startTime) });
      logger.error(`comment with id ${commentId} doesn't exists`);
    } else { // err in db
      const errResponse = getErrResponse({ status: 502, source: req.url, title: "Bad Gateway", details: comment });
      res.status(502).send({ errors: [errResponse], total: 0, took: (Date.now() - startTime) });
      logger.error(`Bad gateway - error fetching db. req: ${req.url}`);
    }
  } catch (err) {
    const errResponse = getErrResponse({ status: 500, source: req.url, title: "Server Error", details: err.message });
    res.status(500).send({ errors: [errResponse], total: 0, took: (Date.now() - startTime) });
    logger.error(`Server Error: ${err.message}`);
  }
};

