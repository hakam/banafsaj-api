    const leaveNames = require("../controllers/leaveNames.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new LeaveNames
    router.post("/leaveNames",auth,reqPerm ,leaveNames.create);
  
    // Retrieve all LeaveNames
    router.get("/leaveNames",auth,reqPerm ,leaveNames.findAll);
  
   // Retrieve a single LeaveNames with id
    router.get("/leaveNames/:id",auth,reqPerm ,leaveNames.findOne);
  
    // Update a LeaveNames with id
    router.put("/leaveNames/:id",auth,reqPerm ,leaveNames.update);
  
    // Delete a LeaveNames with id
    router.delete("/leaveNames/:id",auth,reqPerm ,leaveNames.delete);
  
    // Create a new LeaveNames
  

    module.exports = router
