    const committee = require("../controllers/committee.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new committee
    router.post("/committee",auth,reqPerm, committee.create);
  
    // Retrieve all committee
    router.get("/committee",auth,reqPerm, committee.findAll);
  
   // Retrieve a single committee with id
    router.get("/committee/:id",auth,reqPerm, committee.findOne);
  
    // Update a committee with id
    router.put("/committee/:id",auth,reqPerm,committee.update);
  
    // Delete a committee with id
    router.delete("/committee/:id",auth,reqPerm, committee.delete);
  
    // Create a new committee
  

    module.exports = router
