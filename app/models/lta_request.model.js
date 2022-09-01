const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const ltaRequest = sequelize.define("ltaRequest", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
        name: { type: Sequelize.STRING },
        ltaNo: { type: Sequelize.STRING },
        startDate: { type: Sequelize.DATEONLY },
        deliveryDate: { type: Sequelize.DATEONLY },
        requesterId: { type: Sequelize.INTEGER },
        activityId: { type: Sequelize.INTEGER, defaultValue:1  },
        branchId: { type: Sequelize.INTEGER },
        total: { type: Sequelize.DOUBLE },
        prTypeId: { type: Sequelize.INTEGER },
        prSectorId: { type: Sequelize.INTEGER },
        priceLevelId: { type: Sequelize.INTEGER },
        exTotal: { type: Sequelize.DOUBLE },
        exRate: { type: Sequelize.DOUBLE },
        currency: { type: Sequelize.STRING },
        scope: { type: Sequelize.STRING(1024) },
        statusId: { type: Sequelize.INTEGER , defaultValue:1 },
        stepId: { type: Sequelize.INTEGER , defaultValue:0 },
        prDepartmentId: { type: Sequelize.INTEGER },
        evaluated:{type: Sequelize.BOOLEAN ,defaultValue:false },
        fullEvaluated:{type: Sequelize.BOOLEAN ,defaultValue:false },
        winnerId:{type: Sequelize.INTEGER },
        coId:{type: Sequelize.INTEGER },
    }
    ,{
        freezeTableName: true
    });
    const ltaRequestVersion = new Version(ltaRequest);

    return ltaRequest;

};
