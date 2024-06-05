const S = require("fluent-json-schema");

const tripSchema = S.object()
  .prop("userId", S.string().required())
  // .prop("date", S.string().format("date-time").required())
  .prop("cityName", S.string().required())
  .prop(
    "cityInfo",
    S.array()
      .items(
        S.object()
          .prop("cityCode", S.string().required())
          .prop("description", S.string().required())
          .prop("lat", S.string().required())
          .prop("lng", S.string().required())
      )
      .required()
  )
  .prop("restaurants", S.array().items(S.string()))
  .prop("attractions", S.array().items(S.string()))
  .prop("hotels", S.array().items(S.string()));

module.exports = tripSchema;
