    const purchaserequest = require("../controllers/purchase_request.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new purchaserequest
    router.post("/purchaserequest",auth, purchaserequest.create);
    router.post("/purchaserequest/movepr",auth,reqPerm, purchaserequest.movePr);
    router.post("/purchaserequest/addsetps",auth,reqPerm, purchaserequest.addStepsTpPr);
    router.post("/purchaserequest/dashboard",auth,reqPerm, purchaserequest.prViewDashboard);
    router.get("/purchaserequest/dashboardhoc/:id",auth,reqPerm, purchaserequest.prViewDashboardWithCommitteeHoc);
    router.get("/purchaserequest/dashboardnohoc/:id",auth,reqPerm, purchaserequest.prViewDashboardWithCommittee);
    router.get("/purchaserequest/dashboardpm/:id",auth,reqPerm, purchaserequest.prViewDashboardProjectBudget);
    router.get("/purchaserequest/view/:id",auth,reqPerm, purchaserequest.prView);
    // Retrieve all purchaserequest
    router.get("/purchaserequest",auth,reqPerm,purchaserequest.findAll);
  
   // Retrieve a single purchaserequest with id
    router.get("/purchaserequest/:id",auth,reqPerm, purchaserequest.findOne);
  
    // Update a purchaserequest with id  
    router.put("/purchaserequest/:id",auth,reqPerm, purchaserequest.update);
    router.put("/purchaserequest/status/:id",auth,reqPerm, purchaserequest.updateStatus);

  
    // Delete a purchaserequest with id
    router.delete("/purchaserequest/:id",auth,reqPerm,purchaserequest.delete);
  
    // Create a new purchaserequest
  

    module.exports = router
