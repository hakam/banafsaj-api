    const timesheet_details = require("../controllers/timesheet_details.controller.js");
    const auth = require("../middleware/auth.js");
  
    var router = require("express").Router();
    const reqPerm = require("../middleware/reqPerm.js");

  
    // Create a new timesheet_details
    router.post("/timesheet_details",auth,reqPerm, timesheet_details.create);
  
    // Retrieve all timesheet_details
    router.get("/timesheet_details",auth,reqPerm, timesheet_details.findAll);
  
   // Retrieve a single timesheet_details with id
    router.get("/timesheet_details/:id",auth,reqPerm, timesheet_details.findOne);
  
    // Update a timesheet_details with id
    router.put("/timesheet_details/:id",auth,reqPerm,timesheet_details.update);
  
    // Delete a timesheet_details with id
    router.delete("/timesheet_details/:id",auth,reqPerm, timesheet_details.delete);
  
    // Create a new timesheet_details
  

    module.exports = router
