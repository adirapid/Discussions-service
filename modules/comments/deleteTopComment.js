/**
 * @function deleteTopComment
 * @memberOf comments
 * @param issueId the issue id
 * @param commentId the comment id
 * @description delete top flag from a comment
 * <p><i> DELETE /issue/:issueId/topComment/:commentId </i></p>
 * @returns res contains the comment id.
 * <p></p>
 */

const Database = require("../../database");

module.exports = async function (req, res) {
  const { commentId } = req.params;
  try {
    await Database.update("Comments", { id: commentId }, { top: false });
    res.status(200).send({ commentId });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

