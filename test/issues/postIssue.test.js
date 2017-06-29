/* eslint-disable no-unused-vars, no-undef */
const { chai, chaiHttp, equal, sinon, server, Database, should }  = require("../requiredmodules");

chai.use(chaiHttp);

const data  = require("./mockData/postIssue.mock.json");

describe("post a new issue", () => {
  let create;

  before((done) => {
    create = sinon.stub(Database, "create").returns(new Promise(resolve => resolve(data.result)));
    done();
  });

  after((done) => {
    create.restore();
    done();
  });

  it("should return the new issue /v2/issue Post", (done) => {
    chai.request(server)
      .post("/v2/issue")
      .send({
        title: "title",
        body: "body",
        userId: 2,
        topicId: 3
      })
      .end((err, res) => {
        const areEquals = equal(data.response.data, res.body.data);
        res.should.have.status(201);
        areEquals.should.be.equal(true);
        res.body.total.should.be.equal(data.response.total);
        sinon.assert.calledOnce(create);
        done();
      });
  });
});
