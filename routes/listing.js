const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingsController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

//Lists Route
router.route("/")
  .get(wrapAsync(listingsController.lists))
  .post(isLoggedIn,upload.single('listing[image.url]'),wrapAsync(listingsController.createListing));

//New Route
router.get("/new", isLoggedIn, listingsController.renderNewListing);

//Show Route
router.route("/:id")
  .get(wrapAsync(listingsController.showListing))
  .put(isLoggedIn,isOwner,upload.single('listing[image.url]'), wrapAsync(listingsController.updateListing))
  .delete(isLoggedIn, isOwner, wrapAsync(listingsController.deleteListing));

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingsController.renderEditListing)
);

module.exports = router;
