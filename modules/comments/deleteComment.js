/**
 * @function deleteComment
 * @memberOf comments
 * @param issueId the issues id
 * @param commentId the comment id
 * @description delete comment from an issue
 * <p><i> DELETE /issue/:issueId/comment/:commentId</i></p>
 * @returns res contains the comment id that was removed.
 * <p></p>
 */
const Database = require("../../database");

module.exports = async function (req, res) {
  const { issueId, commentId } = req.params;

  try {
    const comment = await Database.update("Comments", { id: commentId, issueId }, { status: "deleted" });
    if (comment) {
      const issue = await Database.findOne("Issues", { id: issueId });
      await Database.decrement(issue, "commentsCount");
      await Database.destroy("Votes", { type: "comment", typeId: commentId });
      res.status(200).send({ commentId });
      return;
    }
    res.status(200).send({});
  } catch (err) {
    res.status(500).send(err.message);
  }
};

