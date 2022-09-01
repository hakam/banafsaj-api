  const beneficiaries_custom_list = require("../controllers/beneficiaries_custom_list.controller.js");
  const auth = require("../middleware/auth.js");
  const reqPerm = require("../middleware/reqPerm.js");

  var router = require("express").Router();

  // Create a new beneficiaries_custom_list
  router.post("/beneficiaries_custom_list",auth,reqPerm, beneficiaries_custom_list.create);

  // Retrieve all beneficiaries_custom_list
  router.get("/beneficiaries_custom_list",auth,reqPerm, beneficiaries_custom_list.findAll);

 // Retrieve a single beneficiaries_custom_list with id
  router.get("/beneficiaries_custom_list/:id",auth,reqPerm, beneficiaries_custom_list.findOne);

  // Update a beneficiaries_custom_list with id
  router.put("/beneficiaries_custom_list/:id",auth,reqPerm, beneficiaries_custom_list.update);

  // Delete a beneficiaries_custom_list with id
  router.delete("/beneficiaries_custom_list/:id",auth,reqPerm, beneficiaries_custom_list.delete);

  // Create a new beneficiaries_custom_list


  module.exports = router
