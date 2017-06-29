/**
 * @function postIssue
 * @memberOf issues
 * @param title  Issue title
 * @param body Issue body.
 * @param userId the user id who created the issue
 * @param topicId the topic id which the issue related to
 * @description Post a new issue
 * <p><i> POST /v2/issue </i></p>
 * @returns res contains the new issue
 * <p></p>
 */
const Database        = require("../../database");
const getErrResponse  = require("../../utils/getErrResponse");
const logger          = require("../../utils/logger");

module.exports = async function (req, res) {
  const startTime = Date.now();
  const { title, body, userId, topicId } = req.body;
  try {
    const issue = await Database.create("Issues", { title, body, userId, topicId });
    if (typeof issue === "object") { // created
      res.status(201).send({ data: issue, took: Date.now() - startTime, total: 1 });
    } else { // db error
      const errResponse = getErrResponse({ status: 502, source: req.url, title: "Bad Gateway", details: issue });
      res.status(502).send({ errors: [errResponse], total: 0, took: (Date.now() - startTime) });
      logger.error(`Bad gateway - error fetching db in create new issue. req: ${req.url}`);
    }
  } catch (err) {
    const errResponse = getErrResponse({ status: 500, source: req.url, title: "Server Error", details: err.message });
    res.status(500).send({ errors: [errResponse], total: 0, took: (Date.now() - startTime) });
    logger.error(`Server Error: ${err.message}`);
  }
};

