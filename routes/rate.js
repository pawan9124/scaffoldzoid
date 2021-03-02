import express from "express";
import Rate from "../models/Rate.js";
import passport from "passport";

/* Router configuration */
const router = express.Router();

/* 
  Support function to find all the current rates
*/
const findUpatedRate = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const currentRates = await Rate.find({ user: userId });
      resolve(currentRates);
    } catch (error) {
      reject(error);
    }
  });
};

/* 
    @route post api/rate/create
    @access private
*/

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try {
      const rate = new Rate({
        user: req.body.user,
        type: req.body.type,
        rate: req.body.rate,
      });
      rate
        .save()
        .then(async () => {
          const rateDetail = await findUpatedRate(req.body.user);
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
        .then(async () => {
          const rateDetail = await findUpatedRate(req.body.user);
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
        .then(async () => {
          const rateDetail = await findUpatedRate(req.query.user);
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

export default router;
