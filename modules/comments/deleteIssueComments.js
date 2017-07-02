/**
 * @function deleteIssueComments
 * @memberOf comments
 * @param issueId the issue id
 * @description delete all issue comments
 * <p><i> DELETE /v2/issue/:issueId/comments</i></p>
 * @returns res contains the issue id that it comments were removed.
 * <p></p>
 */

const Database = require("../../database");
const getErrResponse  = require("../../utils/getErrResponse");
const logger          = require("../../utils/logger");

module.exports = async function (req, res) {
  const startTime = Date.now();
  const { issueId } = req.params;
  try {
    const comments = await Database.findAll("Comments", { id: issueId, status: "active" }, true);
    if (comments.count > 0) { // found issue comments
      const commentsIds = comments.rows.map(comment => comment.id);
      await Database.update("Comments", { issueId, status: "active" }, { status: "deleted" });
      await Database.destroy("Votes", { type: "comment", typeId: { $in: commentsIds } });
      await Database.update("Issues", { id: issueId, status: "active" }, { commentsCount: 0 });
      res.status(204).send();
    } else { // no comments
      const errResponse = getErrResponse({ status: 404,
        source: req.url,
        title: "Not Found",
        details: "no comments where found to the given issue" });
      res.status(404).send({ errors: [errResponse], total: 0, took: (Date.now() - startTime) });
      logger.error(`Comments for issue ${issueId} doesn't exists`);
    }
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

