const companyPolicy = require("../controllers/companyPolicy.controller.js");
const auth = require("../middleware/auth.js");
const reqPerm = require("../middleware/reqPerm.js");
const upload = require("../middleware/uploaddocumentNew");

var router = require("express").Router();

// Create a new companyPolicy
router.post("/companyPolicy",auth,reqPerm, companyPolicy.create);
router.post("/companyPolicy/uploaddoc",upload.single("file"), companyPolicy.uploadDoc);

// Retrieve all companyPolicy
router.get("/companyPolicy/file/get/:id",auth,reqPerm,companyPolicy.getFile);

router.get("/companyPolicy",auth,reqPerm, companyPolicy.findAll);

// Retrieve a single companyPolicy with id
router.get("/companyPolicy/:id",auth,reqPerm, companyPolicy.findOne);

// Update a companyPolicy with id
router.put("/companyPolicy/:id",auth,reqPerm,companyPolicy.update);

// Delete a companyPolicy with id
router.delete("/companyPolicy/:id",auth,reqPerm, companyPolicy.delete);

// Create a new companyPolicy


module.exports = router
