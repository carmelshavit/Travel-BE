const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const reviewSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  placeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  author: {
    type: String,
    required: true,
  },
  text: String,
});

const Review = mongoose.model("Review", reviewSchema);

async function getReviews(placeId) {
  console.log(placeId);
  try {
    const reviews = await Review.find({ placeId });
    console.log(reviews);
    return reviews;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
// Function to calculate the average rating for a given placeId
async function calculateAverageRating(placeId) {
  try {
    const pipeline = [
      {
        $match: {
          placeId: placeId,

          rating: { $ne: null }, // Filter out documents with null rating
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ];

    const result = await Review.aggregate(pipeline);

    if (result.length > 0) {
      return result[0].averageRating;
    } else {
      return 0;
    }
  } catch (error) {
    console.error("Error calculating average rating:", error);
    throw error;
  }
}

async function createReview({ userId, placeId, rating, text, author }) {
  try {
    const existingReview = await Review.findOne({
      userId,
      placeId,
    });

    if (existingReview != null) {
      existingReview.rating = rating;
      existingReview.text = text;
      existingReview.date = Date.now();
      await existingReview.save();
      return existingReview;
    } else {
      const newReview = new Review({
        userId,
        placeId,
        rating,
        text,
        date: Date.now(),
        author,
      });
      await newReview.save();
      return newReview;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function deleteReviewById(reviewId) {
  try {
    const deletedReview = await Review.findByIdAndDelete(reviewId);
    return deletedReview;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  Review,
  createReview,
  deleteReviewById,
  getReviews,
  calculateAverageRating,
};
