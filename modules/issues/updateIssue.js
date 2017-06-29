/**
 * @function updateIssue
 * @memberOf issues
 * @param issueId the issue to update
 * @param title  Issue title
 * @param body Issue body.
 * @description update the issue
 * <p><i> PATCH /issue/:issueId/:userId? </i></p>
 * @returns res contains the new issue
 * <p></p>
 */
const Database        = require("../../database");
const getErrResponse  = require("../../utils/getErrResponse");
const logger          = require("../../utils/logger");

module.exports = async function (req, res) {
  const startTime = Date.now();
  const { issueId, title, body } = req.body;
  try {
    const update = await Database.update({ id: issueId }, { title, body });
    if (typeof update === "object") {
      res.status(204).send();
    } else {
      const errResponse = getErrResponse({ status: 502, source: req.url, title: "Bad Gateway", details: update });
      res.status(502).send({ errors: [errResponse], total: 0, took: (Date.now() - startTime) });
      logger.error(`Bad gateway - error fetching db in create update issue. req: ${req.url}`);
    }
  } catch (err) {
    const errResponse = getErrResponse({ status: 500, source: req.url, title: "Server Error", details: err.message });
    res.status(500).send({ errors: [errResponse], total: 0, took: (Date.now() - startTime) });
    logger.error(`Server Error: ${err.message}`);
  }
};
