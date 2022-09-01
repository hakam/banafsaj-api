    const tasks = require("../controllers/tasks.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new tasks
    router.post("/tasks",auth,reqPerm, tasks.create);
  
    // Retrieve all tasks
    router.get("/tasks",auth,reqPerm, tasks.findAll);
    router.get("/tasks/group",auth,reqPerm, tasks.findAllByGroup);
   // Retrieve a single tasks with id
    router.get("/tasks/:id",auth,reqPerm, tasks.findOne);
  
    // Update a tasks with id
    router.put("/tasks/:id",auth,reqPerm, tasks.update);
  
    // Delete a tasks with id
    router.delete("/tasks/:id",auth,reqPerm, tasks.delete);
  
    // Create a new tasks
  

    module.exports = router
