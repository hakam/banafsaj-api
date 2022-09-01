    const pr_evaluation_result = require("../controllers/pr_evaluation_result.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new pr_evaluation_result
    router.post("/pr_evaluation_result",auth,reqPerm, pr_evaluation_result.create);
  
    // Retrieve all pr_evaluation_result
    router.get("/pr_evaluation_result",auth,reqPerm, pr_evaluation_result.findAll);
  
   // Retrieve a single pr_evaluation_result with id
    router.get("/pr_evaluation_result/:id",auth,reqPerm, pr_evaluation_result.findOne);
  
    // Update a pr_evaluation_result with id
    router.put("/pr_evaluation_result/:id",auth,reqPerm,pr_evaluation_result.update);
  
    // Delete a pr_evaluation_result with id
    router.delete("/pr_evaluation_result/:id",auth,reqPerm, pr_evaluation_result.delete);
  
    // Create a new pr_evaluation_result
  

    module.exports = router
