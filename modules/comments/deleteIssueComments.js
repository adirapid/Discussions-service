/**
 * @function deleteIssueComments
 * @memberOf comments
 * @param issueId the issue id
 * @description delete all issue comments
 * <p><i> DELETE /issue/:issueId/comments</i></p>
 * @returns res contains the issue id that it comments were removed.
 * <p></p>
 */

const Database = require("../../database");

module.exports = async function (req, res) {
  const { issueId } = req.params;
  try {
    const comments = await Database.findAll("Comments", { id: issueId, status: "active" }, true);
    const commentsIds = comments.map(comment => comment.id);

    await Database.update("Comments", { issueId, status: "active" }, { status: "deleted" });
    await Database.destroy("Votes", { type: "comment", typeId: { $in: commentsIds } });

    res.status(200).send({ issueId });
    return;
  } catch (err) {
    res.status(500).send(err.message);
  }
};

