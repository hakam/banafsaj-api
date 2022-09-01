    const breaks = require("../controllers/breaks.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new breaks
    router.post("/breaks",auth,reqPerm, breaks.create);
  
    // Retrieve all breaks
    router.get("/breaks",auth,reqPerm, breaks.findAll);
  
   // Retrieve a single breaks with id
    router.get("/breaks/:id",auth,reqPerm, breaks.findOne);
  
    // Update a breaks with id
    router.put("/breaks/:id",auth,reqPerm, breaks.update);
  
    // Delete a breaks with id
    router.delete("/breaks/:id",auth,reqPerm, breaks.delete);
  
    // Create a new breaks
  

    module.exports = router
