/* eslint-disable no-unused-vars, no-undef */
const { chai, chaiHttp, equal, sinon, server, Database, should }  = require("../requiredmodules");

chai.use(chaiHttp);

const data = require("./mockData/deleteTopComment.mock.json");


describe("Delete top comment of an issue", () => {
  let update;

  before((done) => {
    update = sinon.stub(Database, "update").returns(new Promise(resolve => resolve([1])));
    done();
  });

  after((done) => {
    update.restore();
    done();
  });

  it("should return the id of the comment /v2/issue/:issueId/topComment/:commentId DELETE", (done) => {
    chai.request(server)
      .delete("/v2/issue/0/topComment/1")
      .end((err, res) => {
        const areEquals = equal(data, res.body);
        res.should.have.status(204);
        areEquals.should.be.equal(true);
        sinon.assert.calledOnce(update);
        done();
      });
  });
});
