    const assetdistribution = require("../controllers/asset_distribution.controller.js");
    const auth = require("../middleware/auth")
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new assetdistribution
    router.post("/assetdistribution",auth,reqPerm, assetdistribution.create);
  
    // Retrieve all assetdistribution
    router.get("/assetdistribution",auth,reqPerm, assetdistribution.findAll);
  
   // Retrieve a single assetdistribution with id
    router.get("/assetdistribution/:id",auth,reqPerm, assetdistribution.findOne);
  
    // Update a assetdistribution with id
    router.put("/assetdistribution/:id",auth,reqPerm, assetdistribution.update);
  
    // Delete a assetdistribution with id
    router.delete("/assetdistribution/:id",auth,reqPerm, assetdistribution.delete);
  
    // Create a new assetdistribution
  

    module.exports = router
