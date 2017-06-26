/* eslint-disable no-unused-vars, no-undef */
const chai      = require("chai");
const chaiHttp  = require("chai-http");
const server    = require("../../index");

const should    = chai.should();
chai.use(chaiHttp);

describe("Set top comment", () => {
  it("should return the comment id - /issue/:issueId/topComment/:commentId Post", (done) => {
    chai.request(server)
      .post("/issue/1/topComment/2")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("id");
        done();
      });
  });
});
