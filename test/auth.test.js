import chai from "chai";
import chaiHttp from "chai-http";
import server from "../server.js";

chai.use(chaiHttp);

describe("Authorization of Users ", () => {
  /*
   *  Register a user query post
   */
  describe("/POST Register and login User", () => {
    it("it should register a user", (done) => {
      let registerData = {
        username: "Test user",
        email: `testuser@yopmail.com`,
        password: "testuser",
        isSeller: true,
        date: Date.now(),
      };
      chai
        .request(server)
        .post("/api/userAuth/register")
        .send(registerData)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("email");
          res.body.should.have.property("username");
          done();
        });
    });
  });

  describe("Post Login  a user", () => {
    it("it should login a user", (done) => {
      let loginData = {
        email: "testuser@yopmail.com",
        password: "testuser",
      };
      chai
        .request(server)
        .post("/api/userAuth/login")
        .send(loginData)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("token");
          done();
        });
    });
  });
});
