    const task_status = require("../controllers/task_status.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new task_status
    router.post("/task_status",auth,reqPerm, task_status.create);
  
    // Retrieve all task_status
    router.get("/task_status",auth,reqPerm, task_status.findAll);
  
   // Retrieve a single task_status with id
    router.get("/task_status/:id",auth,reqPerm, task_status.findOne);
  
    // Update a task_status with id
    router.put("/task_status/:id",auth,reqPerm,task_status.update);
  
    // Delete a task_status with id
    router.delete("/task_status/:id",auth,reqPerm, task_status.delete);
  
    // Create a new task_status
  

    module.exports = router
