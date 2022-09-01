    const holidays = require("../controllers/holidays.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new holidays
    router.post("/holidays",auth,reqPerm, holidays.create);
  
    // Retrieve all holidays
    router.get("/holidays",auth, reqPerm,holidays.findAll);
  
   // Retrieve a single holidays with id
    router.get("/holidays/:id",auth,reqPerm, holidays.findOne);
  
    // Update a holidays with id
    router.put("/holidays/:id",auth,reqPerm, holidays.update);
  
    // Delete a holidays with id
    router.delete("/holidays/:id",auth,reqPerm, holidays.delete);
  
    // Create a new holidays
  

    module.exports = router
