/* eslint-disable no-unused-vars, no-undef */
const { chai, chaiHttp, equal, sinon, server, Database, should }  = require("../requiredmodules");

chai.use(chaiHttp);

const data = require("../../modules/comments/mockData/deleteTopComment.mock.json");


describe("Delete top comment of an issue", () => {
  let update;

  before((done) => {
    update = sinon.stub(Database, "update");
    done();
  });

  after((done) => {
    update.restore();
    done();
  });


  it("should return the id of the comment /issue/:issueId/topComment/:commentId DELETE", (done) => {
    chai.request(server)
      .delete("/issue/0/topComment/1")
      .end((err, res) => {
        const areEquals = equal(data, res.body);
        res.should.have.status(200);
        areEquals.should.be.equal(true);
        sinon.assert.calledOnce(update);
        done();
      });
  });
});
