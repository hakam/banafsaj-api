    const grantsPrograms = require("../controllers/grantsPrograms.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new grantsPrograms
    router.post("/grantsPrograms",auth,reqPerm, grantsPrograms.create);
    // Retrieve all grantsPrograms
    router.get("/grantsPrograms",auth,reqPerm, grantsPrograms.findAll);
  
   // Retrieve a single grantsPrograms with id
    router.get("/grantsPrograms/:id",auth,reqPerm, grantsPrograms.findOne);
  
    // Update a grantsPrograms with id
    router.put("/grantsPrograms/:id",auth,reqPerm, grantsPrograms.update);
  
    // Delete a grantsPrograms with id
    router.delete("/grantsPrograms/:id",auth,reqPerm, grantsPrograms.delete);
  
    // Create a new grantsPrograms
  

    module.exports = router
