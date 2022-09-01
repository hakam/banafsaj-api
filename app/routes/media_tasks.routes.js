    const mediatasks = require("../controllers/media_tasks.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new mediatasks
    router.post("/mediatasks",auth,reqPerm, mediatasks.create);
  
    // Retrieve all mediatasks
    router.get("/mediatasks",auth,reqPerm, mediatasks.findAll);
  
   // Retrieve a single mediatasks with id
    router.get("/mediatasks/:id",auth,reqPerm, mediatasks.findOne);
  
    // Update a mediatasks with id
    router.put("/mediatasks/:id",auth,reqPerm,mediatasks.update);
  
    // Delete a mediatasks with id
    router.delete("/mediatasks/:id",auth,reqPerm, mediatasks.delete);
  
    // Create a new mediatasks
  

    module.exports = router
