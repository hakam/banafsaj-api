  const timeattendance = require("../controllers/timeattendance.controller.js");
  const auth = require("../middleware/auth.js");

  var router = require("express").Router();
  const reqPerm = require("../middleware/reqPerm.js");


  // Create a new timeattendance
  router.post("/timeattendance",auth,reqPerm, timeattendance.create);
  router.post("/timeattendance/bulk",auth,reqPerm, timeattendance.createBulk);
  // Retrieve all timeattendance
  router.get("/timeattendance",auth,reqPerm, timeattendance.findAll);
  router.get("/timeattendance/inout",auth,reqPerm, timeattendance.findAllWithInAndOut);
  router.get("/timeattendance/inoutnull",auth, timeattendance.findNullCheck);
  router.get("/timeattendance/findmax",auth, timeattendance.findMax);

 // Retrieve a single timeattendance with id
  router.get("/timeattendance/:id",auth,reqPerm, timeattendance.findOne);

  // Update a timeattendance with id
  router.put("/timeattendance/:id",auth,reqPerm, timeattendance.update);

  // Delete a timeattendance with id
  router.delete("/timeattendance/:id",auth,reqPerm, timeattendance.delete);

  // Create a new timeattendance


  module.exports = router
