    const prstepsstatus = require("../controllers/pr_steps_status.controller.js");
    const auth = require("../middleware/auth.js");
  
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new prstepsstatus
    router.post("/prstepsstatus",auth,reqPerm, prstepsstatus.create);
  
    // Retrieve all prstepsstatus
    router.get("/prstepsstatus",auth,reqPerm, prstepsstatus.findAll);
  
   // Retrieve a single prstepsstatus with id
    router.get("/prstepsstatus/:id",auth,reqPerm, prstepsstatus.findOne);
  
    // Update a prstepsstatus with id
    router.put("/prstepsstatus/:id",auth,reqPerm,prstepsstatus.update);
  
    // Delete a prstepsstatus with id
    router.delete("/prstepsstatus/:id",auth,reqPerm, prstepsstatus.delete);
  
    // Create a new prstepsstatus
  

    module.exports = router
