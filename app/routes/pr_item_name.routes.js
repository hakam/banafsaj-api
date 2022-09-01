    const pr_item_name = require("../controllers/pr_item_name.controller.js");
    const auth = require("../middleware/auth.js");
  
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new pr_item_name
    router.post("/pr_item_name",auth,reqPerm, pr_item_name.create);
  
    // Retrieve all pr_item_name
    router.get("/pr_item_name",auth,reqPerm, pr_item_name.findAll);
  
   // Retrieve a single pr_item_name with id
    router.get("/pr_item_name/:id",auth,reqPerm, pr_item_name.findOne);
  
    // Update a pr_item_name with id
    router.put("/pr_item_name:id",auth,reqPerm,pr_item_name.update);
  
    // Delete a pr_item_name with id
    router.delete("/pr_item_name/:id",auth,reqPerm, pr_item_name.delete);
  
    // Create a new pr_item_name
  

    module.exports = router
