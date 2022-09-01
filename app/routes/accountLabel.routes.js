
    const accountLabel = require("../controllers/accountLabel.controller.js");
    const auth = require("../middleware/auth");
    const reqPerm = require("../middleware/reqPerm.js");


    var router = require("express").Router();
  
    // Create a new accountLabel
    router.post("/accountLabel",auth,reqPerm,accountLabel.create);
  
    // Retrieve all accountLabel
    router.get("/accountLabel",auth,reqPerm,accountLabel.findAll);
  
   // Retrieve a single accountLabel with id
    router.get("/accountLabel/:id",auth,reqPerm, accountLabel.findOne);
  
    // Update a accountLabel with id
    router.put("/accountLabel/:id",auth,reqPerm, accountLabel.update);
  
    // Delete a accountLabel with id
    router.delete("/accountLabel/:id",auth,reqPerm, accountLabel.delete);
  
    // Create a new accountLabel
    module.exports = router
