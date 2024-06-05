const {
  Hotels,
  Restaurants,
  Attractions,
} = require("../../database/placeQuery");

function getPlaceModelFromPlaceType(type) {
  let Model;

  if (type === "hotel") {
    Model = Hotels;
  } else if (type === "restaurant") {
    Model = Restaurants;
  } else if (type === "attraction") {
    Model = Attractions;
  } else {
    res.status(400).json({ error: `Invalid place type: ${type}` });
    return;
  }

  return Model;
}
module.exports = getPlaceModelFromPlaceType;
