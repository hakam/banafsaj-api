  const shift = require("../controllers/shift.controller.js");
  const auth = require("../middleware/auth.js");

  var router = require("express").Router();
  const reqPerm = require("../middleware/reqPerm.js");


  // Create a new shift
  router.post("/shift",auth,reqPerm, shift.create);

  // Retrieve all shift
  router.get("/shift",auth,reqPerm, shift.findAll);

 // Retrieve a single shift with id
  router.get("/shift/:id",auth,reqPerm, shift.findOne);

  // Update a shift with id
  router.put("/shift/:id",auth,reqPerm, shift.update);

  // Delete a shift with id
  router.delete("/shift/:id",auth,reqPerm, shift.delete);

  // Create a new shift


  module.exports = router
