    const leaveReport = require("../controllers/leaveReport.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new leaveReport
    router.post("/leaveReport",auth,reqPerm, leaveReport.create);
  
    // Retrieve all leaveReport
    router.get("/leaveReport",auth,reqPerm, leaveReport.findAll);
  
   // Retrieve a single leaveReport with id
    router.get("/leaveReport/:id",auth,reqPerm, leaveReport.findOne);
  
    // Update a leaveReport with id
    router.put("/leaveReport/:id",auth,reqPerm,leaveReport.update);
  
    // Delete a leaveReport with id
    router.delete("/leaveReport/:id",auth,reqPerm, leaveReport.delete);
  
    // Create a new leaveReport
  

    module.exports = router
