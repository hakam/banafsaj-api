
    const notifications = require("../controllers/notifications.controller.js");
    const auth = require("../middleware/auth");
    const reqPerm = require("../middleware/reqPerm.js");


    var router = require("express").Router();
  
    // Create a new notifications
    router.post("/notifications",auth,reqPerm,notifications.create);
  
    // Retrieve all notifications
    router.get("/notifications",notifications.findAll);
  
   // Retrieve a single notifications with id
    router.get("/notifications/:id",auth,reqPerm, notifications.findOne);
  
    // Update a notifications with id
    router.put("/notifications/:id",auth,reqPerm, notifications.update);
  
    // Delete a notifications with id
    router.delete("/notifications/:id",auth,reqPerm, notifications.delete);
  
    // Create a new notifications
    module.exports = router
