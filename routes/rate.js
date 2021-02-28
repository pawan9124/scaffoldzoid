import express from "express";
import Rate from "../models/Rate.js";
import passport from "passport";

/* Router configuration */
const router = express.Router();

/* 
    @route post api/rate/create
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
    @route post api/rate/update
    @access private
*/

router.put(
  "/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try {
      const rateObj = {
        id: req.body.id,
        type: req.body.type,
        rate: req.body.rate,
      };
      Rate.updateOne(
        { _id: rateObj.id },
        { $set: { type: rateObj.type, rate: rateObj.rate } }
      )
        .then((rateDetail) => {
          res.status(200).json(rateDetail);
        })
        .catch((error) => {
          console.log("ERROR", error);
          res.status(500).json(error);
        });
    } catch (error) {
      console.log("ERROR", error);
      res.status(500).json(error);
    }
  }
);

/* 
  @route get api/rate/get
  @access private
*/

router.get(
  "/get",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
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

/* 
  @route get api/rate/delete
  @access private
*/

router.delete(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try {
      Rate.deleteOne({ _id: req.query.id })
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
