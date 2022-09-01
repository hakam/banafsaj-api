  const grantsdocs = require("../controllers/grantsdocs.controller.js");
  const upload = require("../middleware/uploaddocument");
  const auth = require("../middleware/auth.js");
  const reqPerm = require("../middleware/reqPerm.js");

  var router = require("express").Router();

  // Create a new grantsdocs
  router.post("/grantsdocs",auth,reqPerm, grantsdocs.create);
  router.post("/grantsdocs/uploaddoc",upload.single("file"), grantsdocs.uploadDoc);

  // Retrieve all grantsdocs
  router.get("/grantsdocs",auth,reqPerm, grantsdocs.findAll);

 // Retrieve a single grantsdocs with id
  router.get("/grantsdocs/:id",auth,reqPerm, grantsdocs.findOne);

  // Update a grantsdocs with id
  router.put("/grantsdocs/:id",auth,reqPerm, grantsdocs.update);

  // Delete a grantsdocs with id
  router.delete("/grantsdocs/:id",auth,reqPerm, grantsdocs.delete);

  // Create a new grantsdocs


  module.exports = router
