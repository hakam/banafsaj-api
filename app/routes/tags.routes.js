    const tags = require("../controllers/tags.controller.js");
    const auth = require("../middleware/auth.js");

    var router = require("express").Router();
    const reqPerm = require("../middleware/reqPerm.js");

  
    // Create a new tags
    router.post("/tags",auth,reqPerm, tags.create);
  
    // Retrieve all tags
    router.get("/tags",auth,reqPerm, tags.findAll);
  
   // Retrieve a single tags with id
    router.get("/tags/:id",auth,reqPerm, tags.findOne);
  
    // Update a tags with id
    router.put("/tags/:id",auth,reqPerm, tags.update);
  
    // Delete a tags with id
    router.delete("/tags/:id",auth,reqPerm, tags.delete);
  
    // Create a new tags
  

    module.exports = router
