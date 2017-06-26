/**
 * @function getIssueComment
 * @memberOf comments
 * @param issueId the issue id
 * @param commentId the comment id
 * @description get comment of an issue
 * <p><i> GET /issue/:issueId/comment/:commentId </i></p>
 * @returns res contains all comment info and user info
 * <p></p>
 */

const Database = require("../../database");

module.exports = async function (req, res) {
  const { issueId, commentId } = req.params;
  try {
    const comment = await Database.findOne("Comments", { issueId, id: commentId });
    if (comment) {
      res.status(200).send(comment);
    } else {
      res.status(200).send({});
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

