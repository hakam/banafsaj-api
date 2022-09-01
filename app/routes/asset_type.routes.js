
    const assettype = require("../controllers/asset_type.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new assettype
    router.post("/assettype",auth,reqPerm, assettype.create);
  
    // Retrieve all assettype
    router.get("/assettype",auth,reqPerm, assettype.findAll);
  
   // Retrieve a single assettype with id
    router.get("/assettype/:id",auth,reqPerm, assettype.findOne);
  
    // Update a assettype with id
    router.put("/assettype/:id",auth,reqPerm, assettype.update);
  
    // Delete a assettype with id
    router.delete("/assettype/:id",auth,reqPerm, assettype.delete);
  
    // Create a new assettype
  
  
    module.exports = router
