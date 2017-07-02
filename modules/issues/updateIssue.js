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
  const { issueId } = req.params;
  const { title, body } = req.body;
  try {
    await Database.update("Issues", { id: issueId, status: "active" }, { title, body });
    res.status(204).send();
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
