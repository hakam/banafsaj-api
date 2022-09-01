const grantsCities = require("../controllers/grantsCities.controller.js");
const auth = require("../middleware/auth.js");
const reqPerm = require("../middleware/reqPerm.js");

var router = require("express").Router();

// Create a new grantsCities
router.post("/grantsCities",auth,reqPerm, grantsCities.create);
// Retrieve all grantsCities
router.get("/grantsCities",auth,reqPerm, grantsCities.findAll);

// Retrieve a single grantsCities with id
router.get("/grantsCities/:id",auth,reqPerm, grantsCities.findOne);

// Update a grantsCities with id
router.put("/grantsCities/:id",auth,reqPerm, grantsCities.update);

// Delete a grantsCities with id
router.delete("/grantsCities/:id/:cid",auth,reqPerm, grantsCities.delete);

// Create a new grantsCities


module.exports = router
