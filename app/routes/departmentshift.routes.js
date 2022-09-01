  const departmentshift = require("../controllers/departmentshift.controller.js");
  const auth = require("../middleware/auth.js");
  const reqPerm = require("../middleware/reqPerm.js");

  var router = require("express").Router();

  // Create a new departmentshift
  router.post("/departmentshift",auth,reqPerm, departmentshift.create);

  // Retrieve all departmentshift
  router.get("/departmentshift",auth,reqPerm, departmentshift.findAll);

 // Retrieve a single departmentshift with id
  router.get("/departmentshift/:id",auth,reqPerm, departmentshift.findOne);

  // Update a departmentshift with id
  router.put("/departmentshift/:id",auth,reqPerm, departmentshift.update);

  // Delete a departmentshift with id
  router.delete("/departmentshift/:id",auth,reqPerm, departmentshift.delete);

  // Create a new departmentshift


  module.exports = router
