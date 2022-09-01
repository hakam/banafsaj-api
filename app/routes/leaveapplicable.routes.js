    const leaveapplicable = require("../controllers/leaveapplicable.controller.js");
    const auth = require("../middleware/auth.js");

    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new leaveapplicable
    router.post("/leaveapplicable",auth,reqPerm, leaveapplicable.create);
  
    // Retrieve all leaveapplicable
    router.get("/leaveapplicable",auth,reqPerm, leaveapplicable.findAll);
  
   // Retrieve a single leaveapplicable with id
    router.get("/leaveapplicable/:id",auth,reqPerm, leaveapplicable.findOne);
  
    // Update a leaveapplicable with id
    router.put("/leaveapplicable/:id",auth,reqPerm, leaveapplicable.update);
  
    // Delete a leaveapplicable with id
    router.delete("/leaveapplicable/:id",auth,reqPerm, leaveapplicable.delete);
  
    // Create a new leaveapplicable
  

    module.exports = router
