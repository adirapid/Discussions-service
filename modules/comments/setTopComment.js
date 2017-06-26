/**
 * @function setTopComment
 * @memberOf comments
 * @param issueId the issue id
 * @param commentId the comment id
 * @description set a comment to be top
 * <p><i> POST /issue/:issueId/topComment/:commentId </i></p>
 * @returns res contains the comment id.
 * <p></p>
 */

const data = require("./mockData/setTopComment.mock.json");

module.exports = function (req, res) {
  res.status(200).send(data);
};

