/* eslint-disable no-unused-vars, no-undef */
const { chai, chaiHttp, equal, sinon, server, Database, should }  = require("../requiredmodules");

chai.use(chaiHttp);

const data  = require("./mockData/deleteIssue.mock.json");

describe("Delete issue", () => {
  let update;
  let findAll;
  let destroy;

  before((done) => {
    update = sinon.stub(Database, "update").returns(new Promise(resolve => resolve([1])));
    findAll = sinon.stub(Database, "findAll").returns(new Promise(resolve => resolve({ rows: [] })));
    destroy = sinon.stub(Database, "destroy").returns(new Promise(resolve => resolve(0)));
    done();
  });

  after((done) => {
    update.restore();
    findAll.restore();
    destroy.restore();
    done();
  });

  it("should return status 204 /v2/issue/:issueId DELETE", (done) => {
    chai.request(server)
      .delete("/v2/issue/1")
      .end((err, res) => {
        const areEquals = equal(data, res.body);
        res.should.have.status(204);
        areEquals.should.be.equal(true);
        sinon.assert.calledTwice(update);
        sinon.assert.calledOnce(findAll);
        sinon.assert.calledTwice(destroy);
        done();
      });
  });
});
