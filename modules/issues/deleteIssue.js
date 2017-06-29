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

    if (typeof destroy === "object") { // db succeed
      if (destroy[0] === 1) { // issue was deleted
        const comments = await Database.findAll("Comments", { issueId, status: "active" }, true);

        if (typeof comments === "object") {
          const commentIds = comments.rows.map(comment => comment.id);
          const deleteComments = await Database.update("Comments", { issueId, status: "active" }, { status: "deleted" });

          if (typeof deleteComments === "object") { // db succeed
            const issuesVotes = await Database.destroy("Votes", { type: "issue", typeId: issueId });
            const commentsVotes = await Database.destroy("Votes", { type: "comment", typeId: { $in: commentIds } });

            if (typeof issuesVotes === "number" && typeof commentsVotes === "number") { // all succeeded
              res.status(204).send();
            } else { // db error
              let errDetails = (typeof issuesVotes === "string") ? (`${issuesVotes}. `) : "";
              errDetails += (typeof commentsVotes === "string" ? commentsVotes : "");
              const errResponse = getErrResponse({ status: 502,
                source: req.url,
                title: "Bad Gateway",
                details: errDetails });
              res.status(502).send({ errors: [errResponse], total: 0, took: (Date.now() - startTime) });
              logger.error(`Bad gateway - error fetching db in Votes table. req: ${req.url}`);
            }
          } else { // db error
            const errResponse = getErrResponse({ status: 502,
              source: req.url,
              title: "Bad Gateway",
              details: deleteComments });
            res.status(502).send({ errors: [errResponse], total: 0, took: (Date.now() - startTime) });
            logger.error(`Bad gateway - error fetching db in update comment status . req: ${req.url}`);
          }
        } else { // db error
          const errResponse = getErrResponse({ status: 502, source: req.url, title: "Bad Gateway", details: comments });
          res.status(502).send({ errors: [errResponse], total: 0, took: (Date.now() - startTime) });
          logger.error(`Bad gateway - error fetching db in find comments. req: ${req.url}`);
        }
      } else { // no issue found
        const errResponse = getErrResponse({ status: 404,
          source: req.url,
          title: "Not Found",
          details: "issue doesn't exists" });
        res.status(404).send({ errors: [errResponse], total: 0, took: (Date.now() - startTime) });
        logger.error(`issue with id ${issueId} and doesn't exists`);
      }
    } else { // db error
      const errResponse = getErrResponse({ status: 502, source: req.url, title: "Bad Gateway", details: destroy });
      res.status(502).send({ errors: [errResponse], total: 0, took: (Date.now() - startTime) });
      logger.error(`Bad gateway - error fetching db in update issue status. req: ${req.url}`);
    }
  } catch (err) {
    const errResponse = getErrResponse({ status: 500, source: req.url, title: "Server Error", details: err.message });
    res.status(500).send({ errors: [errResponse], total: 0, took: (Date.now() - startTime) });
    logger.error(`Server Error: ${err.message}`);
  }
};

