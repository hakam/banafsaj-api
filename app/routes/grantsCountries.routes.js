const grantsCountries = require("../controllers/grantsCountries.controller.js");
const auth = require("../middleware/auth.js");
const reqPerm = require("../middleware/reqPerm.js");

var router = require("express").Router();

// Create a new grantsCountries
router.post("/grantsCountries",auth,reqPerm, grantsCountries.create);
// Retrieve all grantsCountries
router.get("/grantsCountries",auth,reqPerm, grantsCountries.findAll);

// Retrieve a single grantsCountries with id
router.get("/grantsCountries/:id",auth,reqPerm, grantsCountries.findOne);

// Update a grantsCountries with id
router.put("/grantsCountries/:id",auth,reqPerm, grantsCountries.update);

// Delete a grantsCountries with id
router.delete("/grantsCountries/:id/:cid",auth,reqPerm, grantsCountries.delete);

// Create a new grantsCountries


module.exports = router
