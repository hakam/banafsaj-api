    const practivity = require("../controllers/pr_activity.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new practivity
    router.post("/practivity",auth,reqPerm, practivity.create);
  
    // Retrieve all practivity
    router.get("/practivity",auth,reqPerm, practivity.findAll);
  
   // Retrieve a single practivity with id
    router.get("/practivity/:id",auth,reqPerm, practivity.findOne);
  
    // Update a practivity with id
    router.put("/practivity/:id",auth,reqPerm,practivity.update);
  
    // Delete a practivity with id
    router.delete("/practivity/:id",auth,reqPerm, practivity.delete);
  
    // Create a new practivity
  

    module.exports = router
