    const leaveReportView = require("../controllers/leaveReportView.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();

    router.get("/leaveReportView",auth,reqPerm, leaveReportView.findAll);
  
    router.get("/leaveReportView/:id",auth,reqPerm, leaveReportView.findOne);


    module.exports = router
