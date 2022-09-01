    const beneficiaryforms = require("../controllers/beneficiary_forms.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new beneficiaryforms
    router.post("/beneficiaryforms",auth,reqPerm, beneficiaryforms.create);
  
    // Retrieve all beneficiaryforms
    router.get("/beneficiaryforms",auth,reqPerm, beneficiaryforms.findAll);
  
   // Retrieve a single beneficiaryforms with id
    router.get("/beneficiaryforms/:id",auth,reqPerm, beneficiaryforms.findOne);
  
    // Update a beneficiaryforms with id
    router.put("/beneficiaryforms/:id",auth,reqPerm, beneficiaryforms.update);
  
    // Delete a beneficiaryforms with id
    router.delete("/beneficiaryforms/:id",auth,reqPerm, beneficiaryforms.delete);
  
    // Create a new beneficiaryforms
  

    module.exports = router
