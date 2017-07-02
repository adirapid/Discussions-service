/* eslint-disable no-unused-vars, no-undef */
const { chai, chaiHttp, equal, sinon, server, Database, should }  = require("../requiredmodules");

chai.use(chaiHttp);

const data  = require("./mockData/updateIssue.mock.json");

describe("update an issue", () => {
  let update;

  before((done) => {
    update = sinon.stub(Database, "update").returns(new Promise(resolve => resolve({})));
    done();
  });

  after((done) => {
    update.restore();
    done();
  });
  it("should return status 204 /v2/issue/:issueId patch", (done) => {
    chai.request(server)
      .patch("/v2/issue/1")
      .send({
        title: "new title",
        body: "new body",
      })
      .end((err, res) => {
        const areEquals = equal(data, res.body);
        res.should.have.status(204);
        areEquals.should.be.equal(true);
        sinon.assert.calledOnce(update);
        done();
      });
  });
});
