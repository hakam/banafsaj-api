    const timesheet = require("../controllers/timesheet.controller.js");
    const auth = require("../middleware/auth.js");
  
    var router = require("express").Router();
    const reqPerm = require("../middleware/reqPerm.js");

  
    // Create a new timesheet
    router.post("/timesheet",auth,reqPerm, timesheet.create);
  
    // Retrieve all timesheet
    router.get("/timesheet",auth,reqPerm, timesheet.findAll);
  
   // Retrieve a single timesheet with id
    router.get("/timesheet/:id",auth,reqPerm, timesheet.findOne);
  
    // Update a timesheet with id
    router.put("/timesheet/:id",auth,reqPerm,timesheet.update);
  
    // Delete a timesheet with id
    router.delete("/timesheet/:id",auth,reqPerm, timesheet.delete);
  
    // Create a new timesheet
  

    module.exports = router
