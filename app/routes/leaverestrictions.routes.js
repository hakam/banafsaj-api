    const leaverestrictions = require("../controllers/leaverestrictions.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new leaverestrictions
    router.post("/leaverestrictions",auth,reqPerm, leaverestrictions.create);
  
    // Retrieve all leaverestrictions
    router.get("/leaverestrictions",auth,reqPerm, leaverestrictions.findAll);
  
   // Retrieve a single leaverestrictions with id
    router.get("/leaverestrictions/:id",auth,reqPerm, leaverestrictions.findOne);
  
    // Update a leaverestrictions with id
    router.put("/leaverestrictions/:id",auth,reqPerm, leaverestrictions.update);
  
    // Delete a leaverestrictions with id
    router.delete("/leaverestrictions/:id",auth,reqPerm, leaverestrictions.delete);
  
    // Create a new leaverestrictions
  

    module.exports = router
