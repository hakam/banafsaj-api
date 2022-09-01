  const roleEntity = require("../controllers/roleEntity.controller.js");
  const auth = require("../middleware/auth.js");

  var router = require("express").Router();

  // Create a new role_permission
  router.post("/roleEntity",auth, roleEntity.create);

  // Retrieve all role_permission
  router.get("/roleEntity",auth, roleEntity.findAll);

 // Retrieve a single role_permission with id
  router.get("/roleEntity/:id",auth, roleEntity.findOne);

  // Update a role_permission with id
  router.put("/roleEntity/:id",auth, roleEntity.update);

  // Delete a role_permission with id
  router.delete("/roleEntity/:id",auth, roleEntity.delete);

  // Create a new role_permission

  module.exports = router
