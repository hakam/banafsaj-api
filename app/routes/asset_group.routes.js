    const assetgroup = require("../controllers/asset_group.controller.js");
    const auth = require("../middleware/auth.js");
    var router = require("express").Router();
    const reqPerm = require("../middleware/reqPerm.js");

    // Create a new assetgroup
    router.post("/assetgroup",auth,reqPerm, assetgroup.create);
  
    // Retrieve all assetgroup
    router.get("/assetgroup",auth,reqPerm, assetgroup.findAll);
  
   // Retrieve a single assetgroup with id
    router.get("/assetgroup/:id",auth,reqPerm, assetgroup.findOne);
  
    // Update a assetgroup with id
    router.put("/assetgroup/:id",auth,reqPerm, assetgroup.update);
  
    // Delete a assetgroup with id
    router.delete("/assetgroup/:id",auth,reqPerm, assetgroup.delete);
  
    // Create a new assetgroup
  

    module.exports = router
