    const goodreceviednote = require("../controllers/good_recevied_note.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new goodreceviednote
    router.post("/goodreceviednote",auth,reqPerm, goodreceviednote.create);
  
    // Retrieve all goodreceviednote
    router.get("/goodreceviednote",auth,reqPerm, goodreceviednote.findAll);
  
   // Retrieve a single goodreceviednote with id
    router.get("/goodreceviednote/:id",auth,reqPerm, goodreceviednote.findOne);
  
    // Update a goodreceviednote with id
    router.put("/goodreceviednote/:id",auth,reqPerm, goodreceviednote.update);
  
    // Delete a goodreceviednote with id
    router.delete("/goodreceviednote/:id",auth,reqPerm, goodreceviednote.delete);
  
    // Create a new goodreceviednote
  

    module.exports = router
