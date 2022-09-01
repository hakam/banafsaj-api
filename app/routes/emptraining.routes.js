    const emptraining = require("../controllers/emptraining.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new emptraining
    router.post("/emptraining",auth,reqPerm, emptraining.create);
  
    // Retrieve all emptraining
    router.get("/emptraining",auth,reqPerm, emptraining.findAll);
  
   // Retrieve a single emptraining with id
    router.get("/emptraining/:id",auth,reqPerm, emptraining.findOne);
  
    // Update a emptraining with id
    router.put("/emptraining/:id",auth,reqPerm, emptraining.update);
  
    // Delete a emptraining with id
    router.delete("/emptraining/:id",auth,reqPerm, emptraining.delete);
  
    // Create a new emptraining
  

    module.exports = router
