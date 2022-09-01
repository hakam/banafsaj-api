    const empcertificate = require("../controllers/empcertificate.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new empcertificate
    router.post("/empcertificate",auth,reqPerm, empcertificate.create);
  
    // Retrieve all empcertificate
    router.get("/empcertificate",auth,reqPerm, empcertificate.findAll);
  
   // Retrieve a single empcertificate with id
    router.get("/empcertificate/:id",auth,reqPerm, empcertificate.findOne);
  
    // Update a empcertificate with id
    router.put("/empcertificate/:id",auth,reqPerm, empcertificate.update);
  
    // Delete a empcertificate with id
    router.delete("/empcertificate/:id",auth,reqPerm, empcertificate.delete);
  
    // Create a new empcertificate
  

    module.exports = router
