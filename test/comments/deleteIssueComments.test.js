/* eslint-disable no-unused-vars, no-undef */
const { chai, chaiHttp, equal, sinon, server, Database, should }  = require("../requiredmodules");

chai.use(chaiHttp);

const data = require("./mockData/deleteIssueComments.mock.json");

describe("Delete all isuse's comments", () => {
  let update;
  let findAll;
  let destroy;

  before((done) => {
    findAll = sinon.stub(Database, "findAll").returns(new Promise(resolve => resolve({ count: 1, rows: [] })));
    update = sinon.stub(Database, "update");
    destroy = sinon.stub(Database, "destroy");
    done();
  });

  after((done) => {
    findAll.restore();
    update.restore();
    destroy.restore();
    done();
  });

  it("should return the id of the issue. /v2/issue/:issueId/comments DELETE", (done) => {
    chai.request(server)
      .delete("/v2/issue/2/comments")
      .end((err, res) => {
        const areEquals = equal(data, res.body);
        res.should.have.status(204);
        areEquals.should.be.equal(true);
        sinon.assert.calledOnce(findAll);
        sinon.assert.calledTwice(update);
        sinon.assert.calledOnce(destroy);
        done();
      });
  });
});
