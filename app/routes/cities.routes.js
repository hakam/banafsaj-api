  const cities = require("../controllers/cities.controller.js");
  const auth = require("../middleware/auth.js");
  const reqPerm = require("../middleware/reqPerm.js");

  var router = require("express").Router();

  // Create a new cities
  router.post("/cities",auth,reqPerm, cities.create);

  // Retrieve all cities
  router.get("/cities",auth,reqPerm, cities.findAll);

 // Retrieve a single cities with id
  router.get("/cities/:id",auth,reqPerm, cities.findOne);

  // Update a cities with id
  router.put("/cities/:id",auth,reqPerm,cities.update);

  // Delete a cities with id
  router.delete("/cities/:id",auth,reqPerm, cities.delete);

  // Create a new cities


  module.exports = router
