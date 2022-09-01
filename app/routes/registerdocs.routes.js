    const registerdocs = require("../controllers/registerdocs.controller.js");
    const auth = require("../middleware/auth.js");
  
    var router = require("express").Router();
    const reqPerm = require("../middleware/reqPerm.js");

  
    // Create a new registerdocs
    router.post("/registerdocs",auth,reqPerm, registerdocs.create);
  
    // Retrieve all registerdocs
    router.get("/registerdocs",auth,reqPerm, registerdocs.findAll);
  
   // Retrieve a single registerdocs with id
    router.get("/registerdocs/:id",auth,reqPerm, registerdocs.findOne);
  
    // Update a registerdocs with id
    router.put("/registerdocs/:id",auth,reqPerm,registerdocs.update);
  
    // Delete a registerdocs with id
    router.delete("/registerdocs/:id",auth,reqPerm, registerdocs.delete);
  
    // Create a new registerdocs
  

    module.exports = router
