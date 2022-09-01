    const ememrgencycontact = require("../controllers/ememrgencycontact.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new ememrgencycontact
    router.post("/ememrgencycontact",auth,reqPerm, ememrgencycontact.create);
  
    // Retrieve all ememrgencycontact
    router.get("/ememrgencycontact",auth,reqPerm, ememrgencycontact.findAll);
  
   // Retrieve a single ememrgencycontact with id
    router.get("/ememrgencycontact/:id",auth,reqPerm, ememrgencycontact.findOne);
  
    // Update a ememrgencycontact with id
    router.put("/ememrgencycontact/:id",auth,reqPerm, ememrgencycontact.update);
  
    // Delete a ememrgencycontact with id
    router.delete("/ememrgencycontact/:id",auth,reqPerm, ememrgencycontact.delete);
  
    // Create a new ememrgencycontact
  

    module.exports = router
