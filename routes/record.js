const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This connects to the database
const dbo = require("../db/conn");

// This section gets a list of all data collections.
recordRoutes.route("/record").get(function (req, res) {
  let dbConnect = dbo.getDb("data");
  dbConnect
    .collection("amber")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

module.exports = recordRoutes;
