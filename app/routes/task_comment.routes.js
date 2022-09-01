const task_comment = require("../controllers/task_comment.controller.js");
const auth = require("../middleware/auth.js");
const reqPerm = require("../middleware/reqPerm.js");

var router = require("express").Router();

// Create a new task_comment
router.post("/task_comment",auth,reqPerm, task_comment.create);

// Retrieve all task_comment
router.get("/task_comment",auth,reqPerm, task_comment.findAll);

// Retrieve a single task_comment with id
router.get("/task_comment/:id",auth,reqPerm, task_comment.findOne);

// Update a task_comment with id
router.put("/task_comment/:id",auth,reqPerm,task_comment.update);

// Delete a task_comment with id
router.delete("/task_comment/:id",auth,reqPerm, task_comment.delete);

// Create a new task_comment


module.exports = router
