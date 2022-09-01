  const beneficiaries_custom = require("../controllers/beneficiaries_custom.controller.js");
  const auth = require("../middleware/auth.js");
  const reqPerm = require("../middleware/reqPerm.js");

  var router = require("express").Router();

  // Create a new beneficiaries_custom
  router.post("/beneficiaries_custom",auth,reqPerm, beneficiaries_custom.create);

  // Retrieve all beneficiaries_custom
  router.get("/beneficiaries_custom",auth,reqPerm, beneficiaries_custom.findAll);

 // Retrieve a single beneficiaries_custom with id
  router.get("/beneficiaries_custom/:id",auth,reqPerm, beneficiaries_custom.findOne);

  // Update a beneficiaries_custom with id
  router.put("/beneficiaries_custom/:id",auth,reqPerm, beneficiaries_custom.update);

  // Delete a beneficiaries_custom with id
  router.delete("/beneficiaries_custom/:id",auth,reqPerm, beneficiaries_custom.delete);

  // Create a new beneficiaries_custom


  module.exports = router
