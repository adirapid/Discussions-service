/**
 * @function postComment
 * @memberOf comments
 * @param issueId the issue id
 * @description post a comment to an issue
 * <p><i>Post /v2/issue/:issueId/comment </i></p>
 * @returns res contains comment data.
 * <p></p>
 */

const Database        = require("../../database");
const getErrResponse  = require("../../utils/getErrResponse");
const logger          = require("../../utils/logger");

module.exports = async function (req, res) {
  const startTime = Date.now();
  const { body, userId } = req.body;
  const { issueId } = req.params;
  try {
    const comment = await Database.create("Comments", { userId, issueId, body });
    const issue = await Database.findOne("Issues", { id: issueId, status: "active" });
    await Database.increment(issue, "commentsCount");
    res.status(201).send({ data: comment, took: Date.now() - startTime, total: 1 });
  } catch (err) {
    if (err.name === "db error") {
      err.message.source = req.url;
      const errResponse = getErrResponse(err.message);
      res.status(502).send({ errors: [errResponse], total: 0, took: (Date.now() - startTime) });
      logger.error(`Bad gateway - error fetching db. req: ${req.url}`);
    } else {
      const errResponse = getErrResponse({ status: 500, source: req.url, title: "Server Error", details: err.message });
      res.status(500).send({ errors: [errResponse], total: 0, took: (Date.now() - startTime) });
      logger.error(`Server Error: ${err.message}`);
    }
  }
};

