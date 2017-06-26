/**
 * @function updateComment
 * @memberOf comments
 *  @param issueId the issue id
 * @param commentId the comment id
 * @description edit a comment
 * <p><i> PUT /issue/:issueId/comment/:commentId </i></p>
 * @returns res contains the comment id.
 * <p></p>
 */

const data = require("./mockData/updateComment.mock.json");

module.exports = function (req, res) {
  res.status(200).send(data);
};

