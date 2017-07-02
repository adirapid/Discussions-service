/**
 * @function deleteIssue
 * @memberOf Issues
 * @param issueId The issue id.
 * @param userId The user id. (optional)
 * @description Delete the issue from the database, and remove all its comments and rates.
 * <p><i> DELETE /v2/issue/:issueId/:userId? </i></p>
 * @returns res contains the issue id that was removed.
 * <p></p>
 */

const Database        = require("../../database");
const getErrResponse  = require("../../utils/getErrResponse");
const logger          = require("../../utils/logger");

module.exports = async function (req, res) {
  const startTime = Date.now();
  const { issueId } = req.params;
  try {
    const destroy = await Database.update("Issues", { id: issueId, status: "active" }, { status: "deleted" });
    if (destroy[0] === 1) { // issue was deleted
      const comments = await Database.findAll("Comments", { issueId, status: "active" }, true);
      const commentIds = comments.rows.map(comment => comment.id);
      await Database.update("Comments", { issueId, status: "active" }, { status: "deleted" });
      await Database.destroy("Votes", { type: "issue", typeId: issueId });
      await Database.destroy("Votes", { type: "comment", typeId: { $in: commentIds } });
      res.status(204).send();
    } else { // no issue found
      const errResponse = getErrResponse({ status: 404,
        source: req.url,
        title: "Not Found",
        details: "issue doesn't exists" });
      res.status(404).send({ errors: [errResponse], total: 0, took: (Date.now() - startTime) });
      logger.error(`issue with id ${issueId} and doesn't exists`);
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

