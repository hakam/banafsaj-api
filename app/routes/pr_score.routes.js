    const prscore = require("../controllers/pr_score.controller.js");
    const auth = require("../middleware/auth.js");
  
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new prscore
    router.post("/prscore",auth,reqPerm, prscore.create);
  
    // Retrieve all prscore
    router.get("/prscore",auth,reqPerm, prscore.findAll);
  
   // Retrieve a single prscore with id
    router.get("/prscore/:id",auth,reqPerm, prscore.findOne);
  
    // Update a prscore with id
    router.put("/prscore/:id",auth,reqPerm,prscore.update);
  
    // Delete a prscore with id
    router.delete("/prscore/:id",auth,reqPerm, prscore.delete);
  
    // Create a new prscore
  

    module.exports = router
