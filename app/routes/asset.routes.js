    const asset = require("../controllers/asset.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new asset
    router.post("/asset",auth,reqPerm, asset.create);
  
    // Retrieve all asset
    router.get("/asset",auth,reqPerm, asset.findAll);
  
   // Retrieve a single asset with id
    router.get("/asset/:id",auth,reqPerm, asset.findOne);
  
    // Update a asset with id
    router.put("/asset/:id",auth,reqPerm, asset.update);
  
    // Delete a asset with id
    router.delete("/asset/:id",auth,reqPerm, asset.delete);
  
    // Create a new asset
  

    module.exports = router
