import User from "../models/User.js";

import chai from "chai";
import chaiHttp from "chai-http";
import server from "../server.js";
let should = chai.should();
let currentUser = {};
let bearerToken = "";
chai.use(chaiHttp);
describe("Profile of Users ", () => {
  before((done) => {
    User.findOne({ email: "testuser@yopmail.com" }, (err, data) => {
      currentUser = data;
    });
    /* Login and get token */
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
        bearerToken = res.body.token;
        done();
      });
  });
  /*
   *  Create a profile query post
   */
  describe("Profile test for the User", () => {
    /* Create the profile for test */
    it("/POST it should create a profile", (done) => {
      let profileData = {
        description: "This is a test demo",
        user: currentUser.id,
        avatar: "https://i.ibb.co/dkzZ2qr/selena.jpg",
      };
      chai
        .request(server)
        .post("/api/profiles/create")
        .set("Authorization", bearerToken)
        .send(profileData)
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
    /* Fetching all profiles of the users */
    it("/GET it should get all profiles", (done) => {
      chai
        .request(server)
        .get("/api/profiles/getAllProfiles")
        .set("Authorization", bearerToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
    /* Fetching single profile of users */
    it("/GET it should get single profile", (done) => {
      let profileData = {
        user: currentUser.id,
      };
      chai
        .request(server)
        .get("/api/profiles/getSingleProfile")
        .set("Authorization", bearerToken)
        .query(JSON.parse(JSON.stringify(profileData)))
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
  });
});
