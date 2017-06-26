/* eslint-disable no-unused-vars, no-undef */
const chai      = require("chai");
const chaiHttp  = require("chai-http");
const server    = require("../../index");

const should    = chai.should();
chai.use(chaiHttp);

describe("Update comment", () => {
  it("should return the comment id - /issue/:issueIs/comment/:commentId PUT", (done) => {
    chai.request(server)
      .put("/issue/1/comment/2")
      .send({
        body: "this is my updated comment",
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("id");
        done();
      });
  });
});
