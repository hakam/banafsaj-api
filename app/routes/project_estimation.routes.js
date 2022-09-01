    const projectestimation = require("../controllers/project_estimation.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new projectestimation
    router.post("/projectestimation",auth,reqPerm, projectestimation.create);
    router.post("/projectestimation/addblock",auth,reqPerm, projectestimation.blockAmount);
    router.post("/projectestimation/releaseblock",auth,reqPerm, projectestimation.releaseAmount);
    router.post("/projectestimation/addspent",auth,reqPerm, projectestimation.spentAmount);
    // Retrieve all projectestimation
    router.get("/projectestimation",auth,reqPerm, projectestimation.findAll);
  
   // Retrieve a single projectestimation with id
    router.get("/projectestimation/:id",auth,reqPerm, projectestimation.findOne);
  
    // Update a projectestimation with id
    router.put("/projectestimation/:id",auth,reqPerm, projectestimation.update);
  
    // Delete a projectestimation with id
    router.delete("/projectestimation/:id",auth,reqPerm, projectestimation.delete);
  
    // Create a new projectestimation
  

    module.exports = router
