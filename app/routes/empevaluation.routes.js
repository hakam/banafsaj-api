    const empevaluation = require("../controllers/empevaluation.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new empevaluation
    router.post("/empevaluation",auth,reqPerm, empevaluation.create);
  
    // Retrieve all empevaluation
    router.get("/empevaluation",auth,reqPerm, empevaluation.findAll);
  
   // Retrieve a single empevaluation with id
    router.get("/empevaluation/:id",auth,reqPerm, empevaluation.findOne);
  
    // Update a empevaluation with id
    router.put("/empevaluation/:id",auth,reqPerm, empevaluation.update);
  
    // Delete a empevaluation with id
    router.delete("/empevaluation/:id",auth,reqPerm, empevaluation.delete);
  
    // Create a new empevaluation
  

    module.exports = router
