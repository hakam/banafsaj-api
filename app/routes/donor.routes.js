    const donor = require("../controllers/donor.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new donor
    router.post("/donor",auth,reqPerm, donor.create);
  
    // Retrieve all donor
    router.get("/donor",auth,reqPerm, donor.findAll);
  
   // Retrieve a single donor with id
    router.get("/donor/:id",auth,reqPerm, donor.findOne);
  
    // Update a donor with id
    router.put("/donor/:id",auth,reqPerm, donor.update);
  
    // Delete a donor with id
    router.delete("/donor/:id",auth,reqPerm, donor.delete);
  
    // Create a new donor
  

    module.exports = router
