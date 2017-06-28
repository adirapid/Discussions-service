/* eslint-disable no-unused-vars, no-undef */
const { chai, chaiHttp, equal, sinon, server, Database, should }  = require("../requiredmodules");

chai.use(chaiHttp);

const data = require("./mockData/postComment.mock.json");

describe("Post comment to issue", () => {
  let create;
  let findOne;
  let increment;

  before((done) => {
    create = sinon.stub(Database, "create").returns(new Promise(resolve => resolve(data.result)));
    findOne = sinon.stub(Database, "findOne").returns(new Promise(resolve => resolve([])));
    increment = sinon.stub(Database, "increment");
    done();
  });

  after((done) => {
    create.restore();
    findOne.restore();
    increment.restore();
    done();
  });

  it("should return the new comment /v/issue/:issueId/comment Post", (done) => {
    chai.request(server)
      .post("/v2/issue/1/comment")
      .send({
        body: "this is my comment",
        userId: 2,
      })
      .end((err, res) => {
        const areEquals = equal(data.response.data, res.body.data);
        res.should.have.status(201);
        areEquals.should.be.equal(true);
        res.body.total.should.be.equal(1);
        sinon.assert.calledOnce(create);
        sinon.assert.calledOnce(findOne);
        sinon.assert.calledOnce(increment);
        done();
      });
  });
});
