const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const lta_request_items = sequelize.define("lta_request_items", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
        groupId: { type: Sequelize.INTEGER },
        typeId: { type: Sequelize.INTEGER },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
        ltaNo: { type: Sequelize.STRING },
        description: { type: Sequelize.STRING },
        unit: { type: Sequelize.STRING },
        quantity: { type: Sequelize.INTEGER },
        estPrice: { type: Sequelize.DOUBLE },
        estTotal: { type: Sequelize.DOUBLE },
        currency: { type: Sequelize.STRING },
        exRate: { type: Sequelize.DOUBLE },
        exPrice: { type: Sequelize.DOUBLE },
        exTotalPrice: { type: Sequelize.DOUBLE },
     
    }
    ,{
        freezeTableName: true
    });
        const lta_request_itemsVersion = new Version(lta_request_items);

    return lta_request_items;

};
