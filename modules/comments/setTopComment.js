/**
 * @function setTopComment
 * @memberOf comments
 * @param issueId the issue id
 * @param commentId the comment id
 * @description set a comment to be top
 * <p><i> PATCH /issue/:issueId/topComment/:commentId </i></p>
 * @returns res contains the comment id.
 * <p></p>
 */

const Database        = require("../../database");
const getErrResponse  = require("../../utils/getErrResponse");
const logger          = require("../../utils/logger");

module.exports = async function (req, res) {
  const startTime = Date.now();
  const { issueId, commentId } = req.params;
  try {
    await Database.update("Comments", { issueId, status: "active" }, { top: false });
    const update = await Database.update("Comments", { issueId, id: commentId, status: "active" }, { top: true });
    if (update[0] > 0) { // updated top
      res.status(204).send();
    } else { // comment not found
      const errResponse = getErrResponse({ status: 404,
        source: req.url,
        title: "Not Found",
        details: "comment doesn't exists"
      });
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
