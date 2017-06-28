/* eslint-disable no-unused-vars, no-undef */
const { chai, chaiHttp, equal, sinon, server, Database, should }  = require("../requiredmodules");

chai.use(chaiHttp);

const data = require("./mockData/updateComment.mock.json");

describe("Update comment", () => {
  let update;

  before((done) => {
    update = sinon.stub(Database, "update").returns(new Promise(resolve => resolve([1])));
    done();
  });

  after((done) => {
    update.restore();
    done();
  });

  it("should return the comment id - /v2/issue/:issueIs/comment/:commentId PATCH", (done) => {
    chai.request(server)
      .patch("/v2/issue/1/comment/2")
      .send({
        body: "this is my updated comment",
      })
      .end((err, res) => {
        const areEquals = equal(data, res.body);
        areEquals.should.be.equal(true);
        res.should.have.status(204);
        sinon.assert.calledOnce(update);
        done();
      });
  });
});
