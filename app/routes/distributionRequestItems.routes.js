    const distributionRequestItems = require("../controllers/distributionRequestItems.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new distributionRequestItems
    router.post("/distributionRequestItems",auth,reqPerm, distributionRequestItems.create);
  
    // Retrieve all distributionRequestItems
    router.get("/distributionRequestItems",auth,reqPerm, distributionRequestItems.findAll);
  
   // Retrieve a single distributionRequestItems with id
    router.get("/distributionRequestItems/:id",auth,reqPerm, distributionRequestItems.findOne);
  
    // Update a distributionRequestItems with id
    router.put("/distributionRequestItems/:id",auth,reqPerm, distributionRequestItems.update);
  
    // Delete a distributionRequestItems with id
    router.delete("/distributionRequestItems/:id",auth,reqPerm, distributionRequestItems.delete);
  
    // Create a new distributionRequestItems
  

    module.exports = router
