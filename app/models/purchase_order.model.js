const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Purchaseorder = sequelize.define("purchaseorder", {

        createdBy: { type: Sequelize.INTEGER },
        updatedBy: { type: Sequelize.INTEGER },
        canDelete: { type: Sequelize.BOOLEAN, defaultValue: true },
        name: { type: Sequelize.STRING },
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
        , {
            freezeTableName: true
        });
        const purchaseorderVersion = new Version(Purchaseorder);

    return Purchaseorder;

};
