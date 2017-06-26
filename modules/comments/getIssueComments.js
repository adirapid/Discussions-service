/**
 * @function getIssueComments
 * @memberOf comments
 * @param questionId The question id.
 * @param order The order of the comments.
 * @param offset The starting point from where to get the commments.
 * @param limit The max number of comments to get.
 * @description Get [limit] comments starting from [offset] belong to the issue and order it by [order].
 * <p><i>GET /issue/:id/comments</i></p>
 * @returns res contains all issues comments.
 * <p></p>
 */

const Database = require("../../database");

module.exports = async function (req, res) {
  const { issueId } = req.params;
  const { order, offset, limit } =  req.query;
  const limitVal = parseInt(limit) || 5;
  const offsetVal = parseInt(offset) || 0;
  try {
    const comments = await Database.findAll("Comments", { issueId }, false, offsetVal, limitVal, order);
    if (typeof comments === "object") {
      res.status(200).send(comments);
    } else {
      res.status(400).send(comments);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

