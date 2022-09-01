    const leaveentitlement = require("../controllers/leaveentitlement.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new leaveentitlement
    router.post("/leaveentitlement",auth,reqPerm, leaveentitlement.create);
  
    // Retrieve all leaveentitlement
    router.get("/leaveentitlement",auth,reqPerm, leaveentitlement.findAll);
  
   // Retrieve a single leaveentitlement with id
    router.get("/leaveentitlement/:id",auth,reqPerm, leaveentitlement.findOne);
  
    // Update a leaveentitlement with id
    router.put("/leaveentitlement/:id",auth,reqPerm, leaveentitlement.update);
  
    // Delete a leaveentitlement with id
    router.delete("/leaveentitlement/:id",auth,reqPerm, leaveentitlement.delete);

    // Create a new leaveentitlement
  

    module.exports = router
