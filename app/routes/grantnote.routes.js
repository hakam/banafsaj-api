    const grantnote = require("../controllers/grantnote.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new grantnote
    router.post("/grantnote",auth,reqPerm, grantnote.create);
  
    // Retrieve all grantnote
    router.get("/grantnote",auth,reqPerm, grantnote.findAll);
  
   // Retrieve a single grantnote with id
    router.get("/grantnote/:id",auth,reqPerm, grantnote.findOne);
  
    // Update a grantnote with id
    router.put("/grantnote/:id",auth,reqPerm, grantnote.update);
  
    // Delete a grantnote with id
    router.delete("/grantnote/:id",auth,reqPerm, grantnote.delete);
  
    // Create a new grantnote
  

    module.exports = router
