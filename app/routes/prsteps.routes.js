    const prsteps = require("../controllers/prsteps.controller.js");
    const auth = require("../middleware/auth.js");

    var router = require("express").Router();
    const reqPerm = require("../middleware/reqPerm.js");

  
    // Create a new prsteps
    router.post("/prsteps",auth,reqPerm, prsteps.create);
  
    // Retrieve all prsteps
    router.get("/prsteps",auth,reqPerm, prsteps.findAll);
  
   // Retrieve a single prsteps with id
    router.get("/prsteps/:id",auth,reqPerm, prsteps.findOne);
  
    // Update a prsteps with id
    router.put("/prsteps/:id",auth,reqPerm, prsteps.update);
  
    // Delete a prsteps with id
    router.delete("/prsteps/:id",auth,reqPerm, prsteps.delete);
  
    // Create a new prsteps
  

    module.exports = router
