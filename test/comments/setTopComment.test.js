/* eslint-disable no-unused-vars, no-undef */
const { chai, chaiHttp, equal, sinon, server, Database, should }  = require("../requiredmodules");

chai.use(chaiHttp);

const data = require("./mockData/setTopComment.mock.json");

describe("Set top comment", () => {
  let update;

  before((done) => {
    update = sinon.stub(Database, "update").returns(new Promise(resolve => resolve([1])));
    done();
  });

  after((done) => {
    update.restore();
    done();
  });

  it("should return the comment id - /v2/issue/:issueId/topComment/:commentId Patch", (done) => {
    chai.request(server)
      .patch("/v2/issue/1/topComment/2")
      .end((err, res) => {
        const areEquals = equal(data, res.body);
        res.should.have.status(204);
        areEquals.should.be.equal(true);
        sinon.assert.calledTwice(update);
        done();
      });
  });
});
