  const departments = require("../controllers/departments.controller.js");
  const auth = require("../middleware/auth.js");
  const reqPerm = require("../middleware/reqPerm.js");

  var router = require("express").Router();

  // Create a new departments
  router.post("/departments",auth,reqPerm, departments.create);

  // Retrieve all departments
  router.get("/departments",auth,reqPerm, departments.findAll);

 // Retrieve a single departments with id
  router.get("/departments/:id",auth,reqPerm, departments.findOne);

  // Update a departments with id
  router.put("/departments/:id",auth,reqPerm, departments.update);

  // Delete a departments with id
  router.delete("/departments/:id",auth,reqPerm, departments.delete);

  // Create a new departments


  module.exports = router
