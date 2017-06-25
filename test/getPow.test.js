/* eslint-disable no-unused-vars, no-undef */
const chai      = require("chai");
const chaiHttp  = require("chai-http");
const server    = require("../index");

const should    = chai.should();
chai.use(chaiHttp);

describe("GET POW", () => {
  it("should return the square of the given number /pow/:num GET", (done) => {
    chai.request(server)
      .get("/pow/4")
      .end((err, res) => {
        res.text.should.equal("16");
        res.should.have.status(200);
        done();
      });
  });
});
