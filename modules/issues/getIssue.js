/**
 * @function getIssue
 * @memberOf issues
 * @param issueId The issue id.
 * @param order The order of the issue comments.
 * @description get an issue by [issueId]
 * <p><i> GET /v2/issue/:issueId </i></p>
 * @returns res contains the issue and its comments info
 * <p></p>
 */

const Database        = require("../../database");
const getErrResponse  = require("../../utils/getErrResponse");
const logger          = require("../../utils/logger");
const models          = require("../../models");

module.exports = async function (req, res) {
  const startTime = Date.now();
  const { issueId } = req.params;
  const { order } = req.query;
  try {
    const issue = await Database.findOne("Issues", { id: issueId }, [{ model: models.Comments }], order);
    if (issue) {
      if (typeof issue === "object") { // issue was found
        res.status(200).send({ data: issue, took: (Date.now() - startTime), total: 1 });
      } else { // db error
        const errResponse = getErrResponse({ status: 502, source: req.url, title: "Bad Gateway", details: issue });
        res.status(502).send({ errors: [errResponse], total: 0, took: (Date.now() - startTime) });
        logger.error(`Bad gateway - error fetching db in update issue status. req: ${req.url}`);
      }
    } else { // not issue
      const errResponse = getErrResponse({ status: 404,
        source: req.url,
        title: "Not Found",
        details: "issue doesn't exists" });
      res.status(404).send({ errors: [errResponse], total: 0, took: (Date.now() - startTime) });
      logger.error(`issue with id ${issueId} and doesn't exists`);
    }
  } catch (err) {
    const errResponse = getErrResponse({ status: 500, source: req.url, title: "Server Error", details: err.message });
    res.status(500).send({ errors: [errResponse], total: 0, took: (Date.now() - startTime) });
    logger.error(`Server Error: ${err.message}`);
  }
};

