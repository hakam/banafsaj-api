const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Purchase_request_items = sequelize.define("purchase_request_items", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
        activityId: { type: Sequelize.INTEGER },
        groupId: { type: Sequelize.INTEGER },
        typeId: { type: Sequelize.INTEGER },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
        projectId: { type: Sequelize.INTEGER },
        name: { type: Sequelize.STRING },
        prNo: { type: Sequelize.STRING },
        description: { type: Sequelize.STRING },
        unit: { type: Sequelize.STRING },
        quantity: { type: Sequelize.INTEGER },
        estPrice: { type: Sequelize.DOUBLE },
        estTotal: { type: Sequelize.DOUBLE },
        currency: { type: Sequelize.STRING },
        exRate: { type: Sequelize.DOUBLE },
        exPrice: { type: Sequelize.DOUBLE },
        exTotalPrice: { type: Sequelize.DOUBLE },
        projectestimationId: { type: Sequelize.INTEGER },
    }
    ,{
        freezeTableName: true
    });
    const purchase_request_itemsVersion = new Version(Purchase_request_items);

    return Purchase_request_items;

};
