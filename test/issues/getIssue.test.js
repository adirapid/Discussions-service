/* eslint-disable no-unused-vars, no-undef */
const { chai, chaiHttp, equal, sinon, server, Database, should }  = require("../requiredmodules");

chai.use(chaiHttp);

const data  = require("./mockData/getIssue.mock.json");

describe("GET an issue", () => {
  let findOne;

  before((done) => {
    findOne = sinon.stub(Database, "findOne").returns(new Promise(resolve => resolve(data.result)));
    done();
  });

  after((done) => {
    findOne.restore();
    done();
  });

  it("should return issue and its comments info /v2/issue/:issueId GET", (done) => {
    chai.request(server)
      .get("/v2/issue/0")
      .end((err, res) => {
        const areEquals = equal(data.response.data, res.body.data);
        res.should.have.status(200);
        areEquals.should.be.equal(true);
        res.body.total.should.be.equal(1);
        sinon.assert.calledOnce(findOne);
        done();
      });
  });
});
