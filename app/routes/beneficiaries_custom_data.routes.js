  const beneficiaries_custom_data = require("../controllers/beneficiaries_custom_data.controller.js");
  const auth = require("../middleware/auth.js");
  const reqPerm = require("../middleware/reqPerm.js");

  var router = require("express").Router();

  // Create a new beneficiaries_custom_data
  router.post("/beneficiaries_custom_data",auth,reqPerm, beneficiaries_custom_data.create);

  // Retrieve all beneficiaries_custom_data
  router.get("/beneficiaries_custom_data",auth,reqPerm, beneficiaries_custom_data.findAll);

 // Retrieve a single beneficiaries_custom_data with id
  router.get("/beneficiaries_custom_data/:id",auth,reqPerm, beneficiaries_custom_data.findOne);

  // Update a beneficiaries_custom_data with id
  router.put("/beneficiaries_custom_data/:id",auth,reqPerm, beneficiaries_custom_data.update);

  // Delete a beneficiaries_custom_data with id
  router.delete("/beneficiaries_custom_data/:id",auth,reqPerm, beneficiaries_custom_data.delete);

  // Create a new beneficiaries_custom_data


  module.exports = router
