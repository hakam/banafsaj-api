    const doclist = require("../controllers/doclist.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new doclist
    router.post("/doclist",auth,reqPerm, doclist.create);

    // Retrieve all doclist
    router.get("/doclist",auth,reqPerm, doclist.findAll);
  
   // Retrieve a single doclist with id
    router.get("/doclist/:id",auth,reqPerm, doclist.findOne);
  
    // Update a doclist with id
    router.put("/doclist/:id",auth,reqPerm, doclist.update);
  
    // Delete a doclist with id
    router.delete("/doclist/:id",auth,reqPerm, doclist.delete);
  
    // Create a new doclist
  

    module.exports = router
