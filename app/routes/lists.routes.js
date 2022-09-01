    const lists = require("../controllers/lists.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new lists
    router.post("/lists",auth,reqPerm, lists.create);
  
    // Retrieve all lists
    router.get("/lists",auth,reqPerm, lists.findAll);
  
   // Retrieve a single lists with id
    router.get("/lists/:id",auth,reqPerm, lists.findOne);
  
    // Update a lists with id
    router.put("/lists/:id",auth,reqPerm, lists.update);
  
    // Delete a lists with id
    router.delete("/lists/:id",auth,reqPerm, lists.delete);
  
    // Create a new lists
  

    module.exports = router
