    const granttimeline = require("../controllers/granttimeline.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new granttimeline
    router.post("/granttimeline",auth,reqPerm, granttimeline.create);

    // Retrieve all granttimeline
    router.get("/granttimeline",auth,reqPerm, granttimeline.findAll);
  
   // Retrieve a single granttimeline with id
    router.get("/granttimeline/:id",auth,reqPerm, granttimeline.findOne);
  
    // Update a granttimeline with id
    router.put("/granttimeline/:id",auth,reqPerm, granttimeline.update);
  
    // Delete a granttimeline with id
    router.delete("/granttimeline/:id",auth,reqPerm, granttimeline.delete);
  
    // Create a new granttimeline
  

    module.exports = router
