    const prstatus = require("../controllers/prstatus.controller.js");
    const auth = require("../middleware/auth.js");

    var router = require("express").Router();
    const reqPerm = require("../middleware/reqPerm.js");

  
    // Create a new prstatus
    router.post("/prstatus",auth,reqPerm, prstatus.create);
  
    // Retrieve all prstatus
    router.get("/prstatus",auth,reqPerm, prstatus.findAll);
  
   // Retrieve a single prstatus with id
    router.get("/prstatus/:id",auth,reqPerm, prstatus.findOne);
  
    // Update a prstatus with id
    router.put("/prstatus/:id",auth,reqPerm, prstatus.update);
  
    // Delete a prstatus with id
    router.delete("/prstatus/:id",auth,reqPerm, prstatus.delete);
  
    // Create a new prstatus
  

    module.exports = router
