const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  cityName: {
    type: String,
    required: true,
  },
  countryName: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const Hotels = mongoose.model("hotels", placeSchema);
const Restaurants = mongoose.model("restaurants", placeSchema);
const Attractions = mongoose.model("attractions", placeSchema);

async function addPlaceToCollection(place, Model) {
  try {
    const { name, address } = place;
    const existingPlace = await Model.findOne({ name, address });
    console.log(existingPlace);
    if (existingPlace == null) {
      const newPlace = new Model(place);
      const savedPlace = await newPlace.save();
      return savedPlace;
    } else {
      return existingPlace;
    }
  } catch (error) {
    console.log("Error in addPlaceToCollection:", error);
    throw error;
  }
}

async function getPlaceById(userId) {
  try {
    const existingPlace = await Place.findOne({ userId });

    if (existingPlace) {
      return existingPlace;
    } else {
      throw new Error("Place not found");
    }
  } catch (error) {
    console.log("Error in getPlaceById:", error);
    throw error;
  }
}

module.exports = {
  Hotels,
  Restaurants,
  Attractions,
  getPlaceById,
  addPlaceToCollection,
};
