/**
 * @function deleteTopComment
 * @memberOf comments
 * @param issueId the issue id
 * @param commentId the comment id
 * @description delete top flag from a comment
 * <p><i> DELETE /v2/issue/:issueId/topComment/:commentId </i></p>
 * @returns res contains the comment id.
 * <p></p>
 */

const Database        = require("../../database");
const getErrResponse  = require("../../utils/getErrResponse");
const logger          = require("../../utils/logger");

module.exports = async function (req, res) {
  const startTime = Date.now();
  const { commentId } = req.params;
  try {
    const update = await Database.update("Comments", { id: commentId, status: "active" }, { top: false });
    if (update[0] > 0) { // comment was updated
      res.status(204).send();
    } else { // comment not found
      const errResponse = getErrResponse({ status: 404,
        source: req.url,
        title: "Not Found",
        details: "comment doesn't exists" });
      res.status(404).send({ errors: [errResponse], total: 0, took: (Date.now() - startTime) });
      logger.error(`comment with id ${commentId} doesn't exists`);
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

