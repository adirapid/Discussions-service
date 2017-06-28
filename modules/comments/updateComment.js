/**
 * @function updateComment
 * @memberOf comments
 * @param issueId the issue id
 * @param commentId the comment id
 * @description edit a comment
 * <p><i> PATCH /v2/issue/:issueId/comment/:commentId </i></p>
 * @returns res contains the comment id.
 * <p></p>
 */

const Database        = require("../../database");
const getErrResponse  = require("../../utils/getErrResponse");
const logger          = require("../../utils/logger");

module.exports = async function (req, res) {
  const startTime = Date.now();
  const { commentId, issueId } = req.params;
  const { body } = req.body;
  try {
    const update = await Database.update("Comments", { id: commentId, issueId, status: "active" }, { body });
    if (typeof update === "object") {
      if (update[0] > 0) { // update succeeded
        res.status(204).send();
      } else { // comment not found
        const errResponse = getErrResponse({ status: 404,
          source: req.url,
          title: "Not Found",
          details: "comment doesn't exists" });
        res.status(404).send({ errors: [errResponse], total: 0, took: (Date.now() - startTime) });
        logger.error(`comment with id ${commentId} doesn't exists`);
      }
    } else { // error in db
      const errResponse = getErrResponse({ status: 502, source: req.url, title: "Bad Gateway", details: update });
      res.status(502).send({ errors: [errResponse], total: 0, took: (Date.now() - startTime) });
      logger.error(`Bad gateway - error fetching db. req: ${req.url}`);
    }
  } catch (err) {
    const errResponse = getErrResponse({ status: 500, source: req.url, title: "Server Error", details: err.message });
    res.status(500).send({ errors: [errResponse], total: 0, took: (Date.now() - startTime) });
    logger.error(`Server Error: ${err.message}`);
  }
};

