const getIssueComments     = require("./getIssueComments");
const getIssueComment      = require("./getIssueComment");
const postComment          = require("./postComment");
const updateComment        = require("./updateComment");
const deleteComment        = require("./deleteComment");
const setTopComment        = require("./setTopComment");
const deleteTopComment     = require("./deleteTopComment");
const deleteIssueComments  = require("./deleteIssueComments");

module.exports = function (app) {
  app.get("/v2/issue/:issueId/comments", getIssueComments);
  app.get("/v2/issue/:issueId/comment/:commentId", getIssueComment);
  app.post("/v2/issue/:issueId/comment", postComment);
  app.patch("/v2/issue/:issueId/comment/:commentId", updateComment);
  app.delete("/v2/issue/:issueId/comment/:commentId", deleteComment);
  app.delete("/v2/issue/:issueId/comments", deleteIssueComments);
  app.delete("/v2/issue/:issueId/topComment/:commentId", deleteTopComment);
  app.patch("/v2/issue/:issueId/topComment/:commentId", setTopComment);
};
