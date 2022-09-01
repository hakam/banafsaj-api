    const grantstatus = require("../controllers/grantstatus.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new grantstatus
    router.post("/grantstatus",auth,reqPerm, grantstatus.create);
  
    // Retrieve all grantstatus
    router.get("/grantstatus",auth,reqPerm, grantstatus.findAll);
  
   // Retrieve a single grantstatus with id
    router.get("/grantstatus/:id",auth,reqPerm, grantstatus.findOne);
  
    // Update a grantstatus with id
    router.put("/grantstatus/:id",auth,reqPerm, grantstatus.update);
  
    // Delete a grantstatus with id
    router.delete("/grantstatus/:id",auth,reqPerm, grantstatus.delete);
  
    // Create a new grantstatus
  

    module.exports = router
