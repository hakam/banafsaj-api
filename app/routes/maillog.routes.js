    const maillog = require("../controllers/maillog.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new maillog
    router.post("/maillog",auth,reqPerm, maillog.create);
  
    // Retrieve all maillog
    router.get("/maillog",auth,reqPerm, maillog.findAll);
  
   // Retrieve a single maillog with id
    router.get("/maillog/:id",auth,reqPerm, maillog.findOne);
  
    // Update a maillog with id
    router.put("/maillog/:id",auth,reqPerm, maillog.update);
  
    // Delete a maillog with id
    router.delete("/maillog/:id",auth,reqPerm, maillog.delete);
  
    // Create a new maillog
  

    module.exports = router
