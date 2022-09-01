  const municipality = require("../controllers/municipality.controller.js");
  const auth = require("../middleware/auth.js");
  const reqPerm = require("../middleware/reqPerm.js");

  var router = require("express").Router();

  // Create a new municipality
  router.post("/municipality",auth,reqPerm, municipality.create);

  // Retrieve all municipality
  router.get("/municipality",auth,reqPerm, municipality.findAll);

 // Retrieve a single municipality with id
  router.get("/municipality/:id",auth,reqPerm, municipality.findOne);

  // Update a municipality with id
  router.put("/municipality/:id",auth,reqPerm, municipality.update);

  // Delete a municipality with id
  router.delete("/municipality/:id",auth,reqPerm, municipality.delete);

  // Create a new municipality


  module.exports = router
