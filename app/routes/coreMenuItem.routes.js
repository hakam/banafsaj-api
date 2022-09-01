  const coreMenuItem = require("../controllers/coreMenuItem.controller.js");
  const auth = require("../middleware/auth.js");
  const reqPerm = require("../middleware/reqPerm.js");

  var router = require("express").Router();

  // Create a new coreMenuItem
  router.post("/coreMenuItem",auth,reqPerm, coreMenuItem.create);
  // Retrieve all coreMenuItem
  router.get("/coreMenuItem",auth,reqPerm, coreMenuItem.findAllView);
  router.get("/coreMenuItem/list",auth,reqPerm, coreMenuItem.findAllList);
  router.get("/coreMenuItem/menu",auth,reqPerm, coreMenuItem.findMenu);
 // Retrieve a single coreMenuItem with id
  router.get("/coreMenuItem/:id",auth,reqPerm, coreMenuItem.findOne);

  // Update a coreMenuItem with id
  router.put("/coreMenuItem/:id",auth,reqPerm, coreMenuItem.update);

  // Delete a coreMenuItem with id
  router.delete("/coreMenuItem/:id",auth,reqPerm, coreMenuItem.delete);

  // Create a new coreMenuItem


  module.exports = router
