import express from "express";
import Profile from "../models/Profile.js";
import passport from "passport";
import { v2 } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import keys from "../config/keys.js";

/* Router configuration */
const router = express.Router();

/* Cloudinary configuration */

v2.config({
  cloud_name: keys.cloudinary_cloud_name,
  api_key: keys.cloudinary_api_key,
  api_secret: keys.cloudinary_api_secret,
});

var storage = new CloudinaryStorage({
  cloudinary: v2,
  params: {
    folder: (req, file) => {
      return "scaffoldzoid";
    },
    format: async (req, file) => {},
    public_id: (req, file) => {
      return `${file.originalname}-${new Date()}`;
    },
  },
});

const upload = multer({ storage });

/* 
    @route POST /api/profile/create
    @access private
*/

router.post(
  "/create",
  upload.single("avatar"),
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let image = req.file ? req.file.path : "";
      const newProfile = { ...req.body };
      if (image) {
        newProfile["avatar"] = image;
      }
      const saveResponse = await Profile.findOneAndUpdate(
        { user: newProfile.user },
        { $set: newProfile },
        { sort: { points: 1 }, upsert: true, returnNewDocument: true }
      );
      console.log("send", saveResponse);
      res.status(201).json(saveResponse);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);
/*
  @routes api/profile/getAllProfiles
  @access private
 */

router.get(
  "/getAllProfiles",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const allProfiles = await Profile.find({}).populate("user", ["username"]);
      res.status(200).json(allProfiles);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

/* 
  @routes api/products/getSingleProfile
   @access private
*/
router.get(
  "/getSingleProfile",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const singleProfile = await Profile.find({
        user: req.query.id,
      }).populate("user", ["username"]);
      res.status(200).json(singleProfile);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

/* 
  @routes api/profile/search
  @access private

*/

router.get(
  "/search",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const response = await Profile.find({
        $text: { $search: req.query.text },
      });
      res.status(200).json(response);
    } catch (error) {
      res.statu(500).json(error);
    }
  }
);

export default router;
