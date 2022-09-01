  const programs = require("../controllers/programs.controller.js");
  const auth = require("../middleware/auth.js");

  const reqPerm = require("../middleware/reqPerm.js");

  var router = require("express").Router();

  // Create a new programs
  router.post("/programs",auth,reqPerm, programs.create);

  // Retrieve all programs
  router.get("/programs",auth,reqPerm, programs.findAll);

 // Retrieve a single programs with id
  router.get("/programs/:id",auth,reqPerm, programs.findOne);

  // Update a programs with id
  router.put("/programs/:id",auth,reqPerm, programs.update);

  // Delete a programs with id
  router.delete("/programs/:id",auth,reqPerm, programs.delete);

  // Create a new programs


  module.exports = router
