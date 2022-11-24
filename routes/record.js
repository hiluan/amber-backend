const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This connects to the database
const dbo = require("../db/conn");

// This helps convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section gets a list of all data collections.
recordRoutes.route("/record").get(function (req, res) {
  let db_connect = dbo.getDb("data");
  db_connect
    .collection("amber")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section gets a single record by id
recordRoutes.route("/record/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("amber").findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// This section updates a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      person_name: req.body.name,
      person_position: req.body.position,
      person_level: req.body.level,
    },
  };
  db_connect
    .collection("amber")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log(
        //   "1 document updated",
        req.body,
        newvalues
      );
      response.json(res);
    });
});

module.exports = recordRoutes;
