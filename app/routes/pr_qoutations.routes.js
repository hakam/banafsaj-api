    const prqoutations = require("../controllers/pr_qoutations.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new prqoutations
    router.post("/prqoutations",auth,reqPerm, prqoutations.create);
  
    // Retrieve all prqoutations
    router.get("/prqoutations",auth,reqPerm, prqoutations.findAll);
  
   // Retrieve a single prqoutations with id
    router.get("/prqoutations/:id",auth,reqPerm, prqoutations.findOne);
  
    // Update a prqoutations with id
    router.put("/prqoutations/:id",auth,reqPerm,prqoutations.update);
  
    // Delete a prqoutations with id
    router.delete("/prqoutations/:id",auth,reqPerm, prqoutations.delete);
  
    // Create a new prqoutations
  

    module.exports = router
