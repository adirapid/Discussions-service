const getIssues          = require("./getIssues");
const getIssueByTopic    = require("./getIssuesByTopic");
const getIssueByAuthor   = require("./getIssuesByAuthor");
const getIssue           = require("./getIssue");
const postIssue          = require("./postIssue");
const deleteIssue        = require("./deleteIssue");
const updateIssue        = require("./updateIssue");

module.exports = function (app) {
  app.get("/v2/issues", getIssues);
  app.get("/v2/issues/topic/:topicId", getIssueByTopic);
  app.get("/v2/issues/author/:authorId", getIssueByAuthor);
  app.get("/v2/issue/:issueId", getIssue);
  app.post("/v2/issue", postIssue);
  app.delete("/v2/issue/:issueId", deleteIssue);
  app.patch("/v2/issue/:issueId", updateIssue);
};
