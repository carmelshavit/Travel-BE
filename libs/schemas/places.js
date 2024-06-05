const S = require("fluent-json-schema");

const placeSchema = S.object()
  // .prop("date", S.string().format("date-time").required())
  .prop("cityName", S.string().required())
  .prop("countryName", S.string().required())
  .prop("name", S.string().required())
  .prop("description", S.string().required())
  .prop("address", S.string().required())
  .prop("website", S.string())
  .prop("image", S.string().required())
  .prop(
    "type",
    S.string().enum(["hotel", "restaurant", "activity"]).required()
  );

module.exports = placeSchema;
