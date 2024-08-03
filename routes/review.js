// routes/reviews.js
const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { validateReview, isLoggedIn, isReviewAuthor, saveRedirectUrl } = require("../middleware.js");
const reviewsController = require("../controllers/reviews.js");

// Apply saveRedirectUrl middleware to capture redirect URL before handling review routes
router.use(saveRedirectUrl);

// Review Route
router.post("/listings/:id/reviews", isLoggedIn, validateReview, wrapAsync(reviewsController.createReview));

// Delete Review Route
router.delete("/listings/:id/reviews/:reviewId", isReviewAuthor, wrapAsync(reviewsController.deleteReview));

module.exports = router;
