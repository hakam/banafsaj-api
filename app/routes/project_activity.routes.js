    const projectactivity = require("../controllers/project_activity.controller.js");
    const auth = require("../middleware/auth.js");
  
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new projectactivity
    router.post("/projectactivity",auth,reqPerm, projectactivity.create);
  
    // Retrieve all projectactivity
    router.get("/projectactivity",auth,reqPerm, projectactivity.findAll);
  
   // Retrieve a single projectactivity with id
    router.get("/projectactivity/:id",auth,reqPerm, projectactivity.findOne);
  
    // Update a projectactivity with id
    router.put("/projectactivity/:id",auth,reqPerm,projectactivity.update);
  
    // Delete a projectactivity with id
    router.delete("/projectactivity/:id",auth,reqPerm, projectactivity.delete);
  
    // Create a new projectactivity
  

    module.exports = router
