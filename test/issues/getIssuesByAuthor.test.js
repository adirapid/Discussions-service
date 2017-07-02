/* eslint-disable no-unused-vars, no-undef */
const { chai, chaiHttp, equal, sinon, server, Database, should }  = require("../requiredmodules");

chai.use(chaiHttp);

const data  = require("./mockData/getIssues.mock.json");

describe("get Issues by author id", () => {
  let findAll;

  before((done) => {
    findAll = sinon.stub(Database, "findAll").returns(new Promise(resolve => resolve(data.result)));
    done();
  });

  after((done) => {
    findAll.restore();
    done();
  });

  it("should return all author's issues /v2/issues/author/:authorId GET", (done) => {
    chai.request(server)
      .get("/v2/issues/author/1")
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
