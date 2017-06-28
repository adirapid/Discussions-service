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

// update top comment
const updateTop = async (issueId, commentId, res, startTime, reqUrl) => {
  const update = await Database.update("Comments", { issueId, id: commentId, status: "active" }, { top: true });
  if (typeof update === "object") {
    if (update[0] > 0) { // updated top
      res.status(204).send();
    } else { // comment not found
      const errResponse = getErrResponse({ status: 404,
        source: reqUrl,
        title: "Not Found",
        details: "comment doesn't exists"
      });
      res.status(404).send({ errors: [errResponse], total: 0, took: (Date.now() - startTime) });
      logger.error(`comment with id ${commentId} doesn't exists`);
    }
  } else { // error in db
    const errResponse = getErrResponse({ status: 502, source: reqUrl, title: "Bad Gateway", details: update });
    res.status(502).send({ errors: [errResponse], total: 0, took: (Date.now() - startTime) });
    logger.error(`Bad gateway - error fetching db. req: ${reqUrl}`);
  }
};

module.exports = async function (req, res) {
  const startTime = Date.now();
  const { issueId, commentId } = req.params;
  try {
    const removeTop = await Database.update("Comments", { issueId, status: "active" }, { top: false });
    if (typeof removeTop === "object") {
      if (removeTop[0] > 0) { // updated - remove top if exists
        await updateTop(issueId, commentId, res, startTime, req.url);
      } else { // no comments to the issue
        const errResponse = getErrResponse({ status: 404,
          source: req.url,
          title: "Not Found",
          details: "issue doesn't have any comments"
        });
        res.status(404).send({ errors: [errResponse], total: 0, took: (Date.now() - startTime) });
        logger.error(`issue ${issueId} doesn't have any comments`);
      }
    } else { // error in db
      const errResponse = getErrResponse({ status: 502, source: req.url, title: "Bad Gateway", details: removeTop });
      res.status(502).send({ errors: [errResponse], total: 0, took: (Date.now() - startTime) });
      logger.error(`Bad gateway - error fetching db. req: ${req.url}`);
    }
  } catch (err) {
    const errResponse = getErrResponse({ status: 500, source: req.url, title: "Server Error", details: err.message });
    res.status(500).send({ errors: [errResponse], total: 0, took: (Date.now() - startTime) });
    logger.error(`Server Error: ${err.message}`);
  }
};
