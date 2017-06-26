/* eslint-disable no-unused-vars, no-undef */
const { chai, chaiHttp, equal, sinon, server, Database, should }  = require("../requiredmodules");

chai.use(chaiHttp);

const data = require("../../modules/comments/mockData/getIssueComments.mock.json");

describe("GET Issue's comments", () => {
  let findAll;

  before((done) => {
    findAll = sinon.stub(Database, "findAll").returns(new Promise(resolve => resolve(data)));
    done();
  });

  after((done) => {
    findAll.restore();
    done();
  });
  it("should return all issue comments /issue/:issueId/comments GET", (done) => {
    chai.request(server)
      .get("/issue/1/comments")
      .send({
        limit: 2,
        offset: 1,
        order: [
          ["top", "DESC"],
          ["rating", "DESC"]
        ],
      })
      .end((err, res) => {
        const areEquals = equal(data, res.body);
        res.should.have.status(200);
        areEquals.should.be.equal(true);
        sinon.assert.calledOnce(findAll);
        done();
      });
  });
});
