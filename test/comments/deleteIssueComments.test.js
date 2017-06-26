/* eslint-disable no-unused-vars, no-undef */
const { chai, chaiHttp, equal, sinon, server, Database, should }  = require("../requiredmodules");

chai.use(chaiHttp);

const data = require("../../modules/comments/mockData/deleteIssueComments.mock.json");

describe("Delete all isuse's comments", () => {
  let update;
  let findAll;
  let destroy;

  before((done) => {
    findAll = sinon.stub(Database, "findAll").returns(new Promise(resolve => resolve([])));
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

  it("should return the id of the issue /issue/:issueId/comments DELETE", (done) => {
    chai.request(server)
      .delete("/issue/2/comments")
      .end((err, res) => {
        const areEquals = equal(data, res.body);
        res.should.have.status(200);
        areEquals.should.be.equal(true);
        sinon.assert.calledOnce(findAll);
        sinon.assert.calledOnce(update);
        sinon.assert.calledOnce(destroy);
        done();
      });
  });
});
