/* eslint-disable no-unused-vars, no-undef */
const { chai, chaiHttp, equal, sinon, server, Database, should }  = require("../requiredmodules");

chai.use(chaiHttp);

const data = require("./mockData/getIssueComments.mock.json");

describe("GET Issue's comments", () => {
  let findAll;

  before((done) => {
    findAll = sinon.stub(Database, "findAll").returns(new Promise(resolve => resolve(data.result)));
    done();
  });

  after((done) => {
    findAll.restore();
    done();
  });
  it("should return all issue comments /v2/issue/:issueId/comments GET", (done) => {
    chai.request(server)
      .get("/v2/issue/1/comments")
      .send({
        limit: 2,
        offset: 1,
        sort: [
          ["top", "DESC"],
          ["rating", "DESC"]
        ],
      })
      .end((err, res) => {
        const areEquals = equal(data.response.data, res.body.data);
        res.should.have.status(200);
        areEquals.should.be.equal(true);
        res.body.total.should.be.equal(data.response.total);
        sinon.assert.calledOnce(findAll);
        done();
      });
  });
});
