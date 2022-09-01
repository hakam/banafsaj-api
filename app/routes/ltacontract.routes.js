    const ltacontract = require("../controllers/ltacontract.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new ltacontract
    router.post("/ltacontract",auth,reqPerm, ltacontract.create);
  
    // Retrieve all ltacontract
    router.get("/ltacontract",auth,reqPerm, ltacontract.findAll);
  
   // Retrieve a single ltacontract with id
    router.get("/ltacontract/:id",auth,reqPerm, ltacontract.findOne);
  
    // Update a ltacontract with id
    router.put("/ltacontract/:id",auth,reqPerm,ltacontract.update);
  
    // Delete a ltacontract with id
    router.delete("/ltacontract/:id",auth,reqPerm, ltacontract.delete);
  
    // Create a new ltacontract
  

    module.exports = router
