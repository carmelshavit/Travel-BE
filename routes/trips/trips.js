const express = require("express");
const router = express.Router();
const tripQuerys = require("../../database/tripQuerys.js");
const handleServerError = require("../../libs/utility/ErrorHandlers.js");
const tripSchema = require("../../libs/schemas/trips.js");
const validate = require("../../libs/validation.js");

router.post("/", validate(tripSchema), async (req, res) => {
  const newTrip = req.body;
  console.log("hi");
  try {
    const trip = await tripQuerys.createTrip(newTrip);
    res.status(200).json(trip);
  } catch (err) {
    handleServerError(err, res);
  }
});

router.delete("/:id", async (req, res) => {
  const tripId = req.params.id;
  try {
    const trip = await tripQuerys.deleteTripById(tripId);
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }
    res.status(200).json(trip);
  } catch (err) {
    handleServerError(err, res);
  }
});

router.put("/:id", validate(tripSchema), async (req, res) => {
  const tripId = req.params.id;
  const updatedTrip = req.body;
  try {
    const Trip = await tripQuerys.updateTrip(tripId, updatedTrip);
    if (!Trip) {
      return res.status(404).json({ message: "Trip not found" });
    }
    res.status(200).json(Trip);
  } catch (err) {
    handleServerError(err, res);
  }
});

// router.get("/", async (req, res) => {
//   const { countryCode, season, experience } = req.query;

//   try {
//     const filteredTrips = await tripQuerys.getTripsByFilters({
//       destination: countryCode,
//       season,
//       experience,
//     });
//     res.status(200).json(filteredTrips);
//   } catch (err) {
//     handleServerError(err, res);
//   }
// });

module.exports = router;
