const leaveBalance = require("../controllers/leaveBalance.controller.js");
const auth = require("../middleware/auth.js");
const reqPerm = require("../middleware/reqPerm.js");

var router = require("express").Router();

// Create a new leaveBalance
router.post("/leaveBalance",auth,reqPerm, leaveBalance.create);

// Retrieve all leaveBalance
router.get("/leaveBalance",auth,reqPerm, leaveBalance.findAll);

// Retrieve a single leaveBalance with id
router.get("/leaveBalance/:id",auth,reqPerm, leaveBalance.findOne);

// Update a leaveBalance with id
router.put("/leaveBalance/:id",auth,reqPerm, leaveBalance.update);

// Delete a leaveBalance with id
router.delete("/leaveBalance/:id",auth,reqPerm, leaveBalance.delete);

// Create a new leaveBalance


module.exports = router
