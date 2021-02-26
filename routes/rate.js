import express from "express";
import Rate from "../models/Rate.js";
import passport from "passport";

/* Router configuration */
const router = express.Router();

/* 
    @route post api/address/create
    @access private
*/

router.post(
  "/create",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    console.log("responseherer=--------", req.body);
    try {
      const rate = new Rate({
        user: req.body.user,
        type: req.body.type,
        rate: req.body.rate,
      });
      rate
        .save()
        .then((rateDetail) => {
          res.status(200).json(rateDetail);
        })
        .catch((error) => {
          res.status(500).json(error);
        });
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

/* 
  @route get api/address/get
  @access private
*/

router.get(
  "/get",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("REQUEST----------------", req.query);
    try {
      Rate.find({ user: req.query.user })
        .then((rates) => {
          res.status(200).json(rates);
        })
        .catch((error) => {
          res.status(500).json(error);
        });
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

export default router;
