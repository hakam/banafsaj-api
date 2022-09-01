    const trainingemployee = require("../controllers/trainingemployee.controller.js");
    const auth = require("../middleware/auth.js");

    var router = require("express").Router();
    const reqPerm = require("../middleware/reqPerm.js");

  
    // Create a new trainingemployee
    router.post("/trainingemployee",auth,reqPerm, trainingemployee.create);
  
    // Retrieve all trainingemployee
    router.get("/trainingemployee",auth,reqPerm, trainingemployee.findAll);
  
   // Retrieve a single trainingemployee with id
    router.get("/trainingemployee/:id",auth,reqPerm, trainingemployee.findOne);
  
    // Update a trainingemployee with id
    router.put("/trainingemployee/:id",auth,reqPerm, trainingemployee.update);
  
    // Delete a trainingemployee with id
    router.delete("/trainingemployee/:id",auth,reqPerm, trainingemployee.delete);
  
    // Create a new trainingemployee
  

    module.exports = router
