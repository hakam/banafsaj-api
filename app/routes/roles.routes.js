  const roles = require("../controllers/roles.controller.js");
  const auth = require("../middleware/auth.js");

  var router = require("express").Router();
  const reqPerm = require("../middleware/reqPerm.js");


  // Create a new roles
  router.post("/roles",auth,reqPerm, roles.create);

  // Retrieve all roles
  router.get("/roles",auth,reqPerm, roles.findAll);

 // Retrieve a single roles with id
  router.get("/roles/:id",auth,reqPerm, roles.findOne);

  // Update a roles with id
  router.put("/roles/:id",auth,reqPerm, roles.update);

  // Delete a roles with id
  router.delete("/roles/:id",auth,reqPerm, roles.delete);

  // Create a new roles


  module.exports = router
