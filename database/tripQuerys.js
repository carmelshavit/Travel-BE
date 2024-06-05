const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  cityName: {
    type: String,
    required: true,
  },
  cityInfo: [
    {
      cityCode: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      lat: {
        type: String,
        required: true,
      },
      lng: {
        type: String,
        required: true,
      },
    },
  ],

  restaurants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },
  ],
  attractions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attraction",
    },
  ],
  hotels: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
    },
  ],
});

const Trip = mongoose.model("Trip", tripSchema);

const createTrip = async function (newTrip) {
  try {
    const trip = new Trip(newTrip);
    console.log(trip);
    await trip.save();
    return trip;
  } catch (err) {
    console.error(err);
  }
};

const findTrips = async function () {
  try {
    const trips = await Trip.find();
    return trips;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const deleteTripById = async function (tripId) {
  try {
    const result = await Trip.deleteOne({ _id: tripId });
    return result;
  } catch (err) {
    console.error(err);
  }
};

const updateTrip = async function (tripId, updatedValues) {
  try {
    const updatedTrip = await Trip.findOneAndUpdate(
      { _id: tripId },
      { $set: updatedValues },
      { new: true }
    );
    return updatedTrip;
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  Trip,
  createTrip,
  updateTrip,
  deleteTripById,
  findTrips,
};
