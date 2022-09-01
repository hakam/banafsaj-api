    const branches = require("../controllers/branches.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new branches
    router.post("/branches",auth,reqPerm, branches.create);
  
    // Retrieve all branches
    router.get("/branches",auth,reqPerm, branches.findAll);
  
   // Retrieve a single branches with id
    router.get("/branches/:id",auth,reqPerm, branches.findOne);
  
    // Update a branches with id
    router.put("/branches/:id",auth,reqPerm, branches.update);
  
    // Delete a branches with id
    router.delete("/branches/:id",auth,reqPerm, branches.delete);
  
    // Create a new branches
  

    module.exports = router
