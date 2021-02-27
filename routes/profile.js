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
      console.log("FIRLENAME", file);
      return "scaffoldzoid";
    },
    format: async (req, file) => {},
    public_id: (req, file) => {
      console.log("PUBLICDID", file);
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
  //   passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    console.log("REQEES", req.file);
    try {
      let image = req.file ? req.file.path : "";
      console.log("imagearr", image);
      const newProfile = { ...req.body, avatar: image };
      const saveResponse = await Profile.findOneAndUpdate(
        { user: newProfile.user },
        { $set: newProfile },
        { sort: { points: 1 }, upsert: true, returnNewDocument: true }
      );
      res.status(201).json(saveResponse);
    } catch (error) {
      console.log("Error", error);
    }
  }
);
/*
  @routes api/profile/getAllProfiles
  @public
 */

router.get(
  "/getAllProfiles",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const allProfiles = await Profile.find({}).populate("user", ["username"]);
      console.log(
        "HERE INSIDE THE TECH OF THE TECHH____________________---------------------------",
        allProfiles
      );
      res.status(200).json(allProfiles);
    } catch (error) {
      console.log("Error", error);
      res.status(500).json(error);
    }
  }
);

/* 
  @routes api/products/getSingleProfile
  @public
*/
router.get("/getSingleProfile", async (req, res) => {
  try {
    console.log("req=x=x=x=x=x=x=x=,", req.query);
    const singleProfile = await Profile.find({
      user: req.query.id,
    }).populate("user", ["username"]);
    res.status(200).json(singleProfile);
  } catch (error) {
    res.status(500).json(error);
  }
});

/* 
  @routes api/products/search
  @public

*/

router.get("/search", async (req, res) => {
  try {
    console.log("params", req.query);
    const response = await Product.find({ $text: { $search: req.query.text } });
    res.status(200).json(response);
  } catch (error) {
    res.statu(500).json(error);
  }
});

export default router;
