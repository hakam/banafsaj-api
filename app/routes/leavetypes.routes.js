    const leavetypes = require("../controllers/leavetypes.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new leavetypes
    router.post("/leavetypes",auth,reqPerm, leavetypes.create);
    router.post("/leavetypes/getleaves",auth,reqPerm, leavetypes.getMyLeaves);
    router.get("/leavetypes/getAllLeaves",auth,reqPerm, leavetypes.getAllMyLeaves);

    // Retrieve all leavetypes
    router.get("/leavetypes",auth,reqPerm, leavetypes.findAll);
  
   // Retrieve a single leavetypes with id
    router.get("/leavetypes/:id",auth,reqPerm, leavetypes.findOne);
  
    // Update a leavetypes with id
    router.put("/leavetypes/:id",auth,reqPerm, leavetypes.update);
  
    // Delete a leavetypes with id
    router.delete("/leavetypes/:id",auth,reqPerm, leavetypes.delete);
  
    // Create a new leavetypes
  

    module.exports = router
