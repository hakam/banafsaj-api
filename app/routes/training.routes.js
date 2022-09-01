    const training = require("../controllers/training.controller.js");
    const auth = require("../middleware/auth.js");

    var router = require("express").Router();
    const reqPerm = require("../middleware/reqPerm.js");

  
    // Create a new training
    router.post("/training",auth,reqPerm, training.create);
  
    // Retrieve all training
    router.get("/training",auth,reqPerm, training.findAll);
  
   // Retrieve a single training with id
    router.get("/training/:id",auth,reqPerm, training.findOne);
  
    // Update a training with id
    router.put("/training/:id",auth,reqPerm, training.update);
  
    // Delete a training with id
    router.delete("/training/:id",auth,reqPerm, training.delete);
  
    // Create a new training
  

    module.exports = router
