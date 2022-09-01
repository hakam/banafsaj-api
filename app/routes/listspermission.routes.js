    const listspermission = require("../controllers/listspermission.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new listspermission
    router.post("/listspermission",auth,reqPerm, listspermission.create);
  
    // Retrieve all listspermission
    router.get("/listspermission",auth,reqPerm, listspermission.findAll);
  
   // Retrieve a single listspermission with id
    router.get("/listspermission/:id",auth,reqPerm, listspermission.findOne);
  
    // Update a listspermission with id
    router.put("/listspermission/:id",auth,reqPerm, listspermission.update);
  
    // Delete a listspermission with id
    router.delete("/listspermission/:id",auth,reqPerm, listspermission.delete);
  
    // Create a new listspermission
  

    module.exports = router
