    const prpricelevel = require("../controllers/pr_price_level.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new prpricelevel
    router.post("/prpricelevel",auth,reqPerm, prpricelevel.create);
  
    // Retrieve all prpricelevel
    router.get("/prpricelevel",auth,reqPerm, prpricelevel.findAll);
  
   // Retrieve a single prpricelevel with id
    router.get("/prpricelevel/:id",auth,reqPerm, prpricelevel.findOne);
  
    // Update a prpricelevel with id
    router.put("/prpricelevel/:id",auth,reqPerm,prpricelevel.update);
  
    // Delete a prpricelevel with id
    router.delete("/prpricelevel/:id",auth,reqPerm, prpricelevel.delete);
  
    // Create a new prpricelevel
  

    module.exports = router
