  const countries = require("../controllers/countries.controller.js");
  //const auth = require("../middleware/auth.js");

  var router = require("express").Router();

  // Create a new countries
  router.post("/countries", countries.create);

  // Retrieve all countries
  router.get("/countries", countries.findAll);

 // Retrieve a single countries with id
  router.get("/countries/:id", countries.findOne);

  // Update a countries with id
  router.put("/countries/:id", countries.update);

  // Delete a countries with id
  router.delete("/countries/:id", countries.delete);

  // Create a new countries


  module.exports = router
