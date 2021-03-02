import mongoose from "mongoose";
import Rate from "../models/Rate.js";
import User from "../models/User.js";

import chai from "chai";
import chaiHttp from "chai-http";
import server from "../server.js";
let should = chai.should();
let currentUser = {};
let currentRateId = "";
let bearerToken = "";

chai.use(chaiHttp);

describe("Rate Chart of Users ", () => {
  beforeEach((done) => {
    User.findOne({ email: "testuser@yopmail.com" }, (err, data) => {
      currentUser = data;
    });
    /* Login the user */
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
  /* Cleaning the user after the use of the tests */
  after((done) => {
    User.remove({ email: `testuser@yopmail.com` }, (err) => {
      done();
    });
  });
  /*
   *  Rate creating query post
   */
  describe("Rate Chart", () => {
    it("/POST it should create a rate chart ", (done) => {
      let rateData = {
        user: currentUser._id,
        type: "Orange Type Test",
        rate: 100,
      };
      chai
        .request(server)
        .post("/api/rates/create")
        .set("Authorization", bearerToken)
        .send(rateData)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          currentRateId = res.body[0]._id;
          done();
        });
    });

    /* updating the rate chart */
    it("/UPDATE it should update a rate chart ", (done) => {
      let rateData = {
        id: currentRateId,
        user: currentUser._id,
        type: "Orange Type Udpated Test",
        rate: 150,
      };
      chai
        .request(server)
        .put("/api/rates/update")
        .set("Authorization", bearerToken)
        .send(rateData)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          currentRateId = res.body[0]._id;
          done();
        });
    });

    /* Fetching  the rate chart */
    it("/Get it should get all rate chart ", (done) => {
      let rateData = {
        user: currentUser._id,
      };
      chai
        .request(server)
        .get("/api/rates/get")
        .set("Authorization", bearerToken)
        .query(JSON.parse(JSON.stringify(rateData)))
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          currentRateId = res.body[0]._id;
          done();
        });
    });
    /* Fetching  the rate chart */
    it("/Delete it should delete the rate chart ", (done) => {
      let rateData = {
        id: currentRateId,
        user: currentUser._id,
      };
      chai
        .request(server)
        .delete("/api/rates/delete")
        .set("Authorization", bearerToken)
        .query(JSON.parse(JSON.stringify(rateData)))
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
  });
});
