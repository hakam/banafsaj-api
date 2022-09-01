const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Purchaserequest = sequelize.define("purchaserequest", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
        name: { type: Sequelize.STRING },
        projectId: { type: Sequelize.INTEGER },
        prNo: { type: Sequelize.STRING },
        startDate: { type: Sequelize.DATEONLY },
        deliveryDate: { type: Sequelize.DATEONLY },
        requesterId: { type: Sequelize.INTEGER },
        activityId: { type: Sequelize.INTEGER, defaultValue:1  },
        branchId: { type: Sequelize.INTEGER },
        total: { type: Sequelize.DOUBLE },
        prTypeId: { type: Sequelize.INTEGER },
        projectestimationId: { type: Sequelize.INTEGER },
        prSectorId: { type: Sequelize.INTEGER },
        priceLevelId: { type: Sequelize.INTEGER },
        exTotal: { type: Sequelize.DOUBLE },
        exRate: { type: Sequelize.DOUBLE },
        currency: { type: Sequelize.STRING },
        scope: { type: Sequelize.STRING(1024) },
        statusId: { type: Sequelize.INTEGER , defaultValue:1 },
        stepId: { type: Sequelize.INTEGER , defaultValue:0 },
        departmentId: { type: Sequelize.INTEGER },
        workPlace: { type: Sequelize.STRING },
        designationId: { type: Sequelize.INTEGER },
        typeRecruitment: { type: Sequelize.STRING },
        duration: { type: Sequelize.INTEGER },
        employmentType: { type: Sequelize.STRING },
        scheduleStartDate: { type: Sequelize.DATEONLY },
        prDepartmentId: { type: Sequelize.INTEGER },
        evaluated:{type: Sequelize.BOOLEAN ,defaultValue:false },
        fullEvaluated:{type: Sequelize.BOOLEAN ,defaultValue:false },
        winnerId:{type: Sequelize.INTEGER },
        blockedAmount:{type: Sequelize.DOUBLE },
        poId:{type: Sequelize.INTEGER },
        coId:{type: Sequelize.INTEGER },
        comId:{type: Sequelize.INTEGER },
        pmId:{type: Sequelize.INTEGER}
    }
    ,{
        freezeTableName: true
    });
    const PurchaserequestVersion = new Version(Purchaserequest);

    return Purchaserequest;

};
