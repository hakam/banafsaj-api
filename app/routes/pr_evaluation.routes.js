    const pr_evaluation = require("../controllers/pr_evaluation.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new pr_evaluation
    router.post("/pr_evaluation",auth,reqPerm, pr_evaluation.create);
  
    // Retrieve all pr_evaluation
    router.get("/pr_evaluation",auth,reqPerm, pr_evaluation.findAll);
  
   // Retrieve a single pr_evaluation with id
    router.get("/pr_evaluation/:id",auth,reqPerm, pr_evaluation.findOne);
  
    // Update a pr_evaluation with id
    router.put("/pr_evaluation/:id",auth,reqPerm, pr_evaluation.update);
  
    // Delete a pr_evaluation with id
    router.delete("/pr_evaluation/:id",auth,reqPerm, pr_evaluation.delete);
  
    // Create a new pr_evaluation
  

    module.exports = router
