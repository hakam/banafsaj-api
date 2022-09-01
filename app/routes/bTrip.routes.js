    const bTrip = require("../controllers/bTrip.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new bTrip
    router.post("/bTrip",auth,reqPerm, bTrip.create);
  
    // Retrieve all bTrip
    router.get("/bTrip",auth,reqPerm, bTrip.findAll);
  
   // Retrieve a single bTrip with id
    router.get("/bTrip/:id",auth,reqPerm, bTrip.findOne);
  
    // Update a bTrip with id
    router.put("/bTrip/:id",auth,reqPerm, bTrip.update);
  
    // Delete a bTrip with id
    router.delete("/bTrip/:id",auth,reqPerm, bTrip.delete);
  
    // Create a new bTrip
  

    module.exports = router
