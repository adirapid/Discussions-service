/**
 * @function postComment
 * @memberOf comments
 * @param issueId the issue id
 * @description post a comment to an issue
 * <p><i>Post /issue/:issueId/comment </i></p>
 * @returns res contains comment data.
 * <p></p>
 */

const Database = require("../../database");

module.exports = async function (req, res) {
  const { body, userId } = req.body;
  const { issueId } = req.params;
  try {
    const answer = await Database.create("Comments", { userId, issueId, body });
    const issue = await Database.findOne("Issues", { id: issueId });
    await Database.increment(issue, "commentsCount");
    res.status(200).send(answer);
  } catch (err) {
    res.status(500).send(`Error creating new comment in the database: ${err.message}`);
  }
};

