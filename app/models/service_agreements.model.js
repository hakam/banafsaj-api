const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Serviceagreements = sequelize.define("serviceagreements", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
        name : { type: Sequelize.STRING },
		description: { type: Sequelize.STRING },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
        startDate: { type: Sequelize.DATEONLY },
		endDate: { type: Sequelize.DATEONLY },
        projectId: { type: Sequelize.INTEGER },
        prNo: { type: Sequelize.STRING },
        prId: { type: Sequelize.INTEGER },
        startDate: { type: Sequelize.DATEONLY },
        deliveryDate: { type: Sequelize.DATEONLY },
        requesterId: { type: Sequelize.INTEGER },
        activityId: { type: Sequelize.INTEGER, defaultValue: 1 },
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
        statusId: { type: Sequelize.INTEGER, defaultValue: 1 },
        vendorId: { type: Sequelize.INTEGER },
        received: { type: Sequelize.BOOLEAN, defaultValue: false },
    }
    ,{
        freezeTableName: true
    });
    const serviceagreementsVersion = new Version(Serviceagreements);

    return Serviceagreements;

};