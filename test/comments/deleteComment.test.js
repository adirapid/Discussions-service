/* eslint-disable no-unused-vars, no-undef */
const { chai, chaiHttp, equal, sinon, server, Database, should }  = require("../requiredmodules");

chai.use(chaiHttp);

const data  = require("./mockData/deleteComment.mock.json");

describe("Delete comment from issue", () => {
  let update;
  let findOne;
  let decrement;
  let destroy;

  before((done) => {
    update = sinon.stub(Database, "update").returns(new Promise(resolve => resolve([1])));
    findOne = sinon.stub(Database, "findOne");
    decrement = sinon.stub(Database, "decrement");
    destroy = sinon.stub(Database, "destroy");
    done();
  });

  after((done) => {
    update.restore();
    findOne.restore();
    decrement.restore();
    destroy.restore();
    done();
  });

  it("should return the id of the deleted comment /v2/issue/:issueId/comment/:commentId DELETE", (done) => {
    chai.request(server)
      .delete("/v2/issue/0/comment/1")
      .end((err, res) => {
        const areEquals = equal(data, res.body);
        res.should.have.status(204);
        areEquals.should.be.equal(true);
        sinon.assert.calledOnce(update);
        sinon.assert.calledOnce(findOne);
        sinon.assert.calledOnce(decrement);
        sinon.assert.calledOnce(destroy);
        done();
      });
  });
});
