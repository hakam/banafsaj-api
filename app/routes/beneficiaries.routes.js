    const beneficiaries = require("../controllers/beneficiaries.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new beneficiaries
    router.post("/beneficiaries",auth,reqPerm, beneficiaries.create);
  
    // Retrieve all beneficiaries
    router.get("/beneficiaries",auth,reqPerm, beneficiaries.findAll);
  
   // Retrieve a single beneficiaries with id
    router.get("/beneficiaries/:id",auth,reqPerm, beneficiaries.findOne);
  
    // Update a beneficiaries with id
    router.put("/beneficiaries/:id",auth,reqPerm, beneficiaries.update);
  
    // Delete a beneficiaries with id
    router.delete("/beneficiaries/:id",auth,reqPerm, beneficiaries.delete);
  
    // Create a new beneficiaries
  

    module.exports = router
