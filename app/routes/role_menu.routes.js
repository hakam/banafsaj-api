  const role_menu = require("../controllers/role_menu.controller.js");
  const auth = require("../middleware/auth.js");

  var router = require("express").Router();
  const reqPerm = require("../middleware/reqPerm.js");


  // Create a new role_permission
  router.post("/role_menu",auth,reqPerm, role_menu.create);

  // Retrieve all role_permission
  router.get("/role_menu/list",auth,reqPerm, role_menu.findAllList);

  router.get("/role_menu",auth,reqPerm, role_menu.findAll);

 // Retrieve a single role_permission with id
  router.get("/role_menu/:id",auth,reqPerm, role_menu.findOne);

  // Update a role_permission with id
  router.put("/role_menu/:id",auth,reqPerm, role_menu.update);

  // Delete a role_permission with id
  router.delete("/role_menu/:id",auth,reqPerm, role_menu.delete);

  // Create a new role_permission

  module.exports = router
