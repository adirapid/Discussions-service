const getIssueComments     = require("./getIssueComments");
const getIssueComment      = require("./getIssueComment");
const postComment          = require("./postComment");
const updateComment        = require("./updateComment");
const deleteComment        = require("./deleteComment");
const setTopComment        = require("./setTopComment");
const deleteTopComment     = require("./deleteTopComment");
const deleteIssueComments  = require("./deleteIssueComments");

module.exports = function (app) {
  app.get("/issue/:issueId/comments", getIssueComments);
  app.get("/issue/:issueId/comment/:commentId", getIssueComment);
  app.post("/issue/:issueId/comment", postComment);
  app.put("/issue/:issueId/comment/:commentId", updateComment);
  app.delete("/issue/:issueId/comment/:commentId", deleteComment);
  app.post("/issue/:issueId/topComment/:commentId", setTopComment);
  app.delete("/issue/:issueId/topComment/:commentId", deleteTopComment);
  app.delete("/issue/:issueId/comments", deleteIssueComments);
};
