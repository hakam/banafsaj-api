const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const procurementplan = sequelize.define("procurementplan", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
		name : { type: Sequelize.STRING },
        budgetLinecode : { type: Sequelize.STRING },
        activity : { type: Sequelize.STRING },
        itemName : { type: Sequelize.STRING },
        unit : { type: Sequelize.STRING },
        quantity : { type: Sequelize.STRING },
        unitPrice : { type: Sequelize.STRING },
        totalPrice : { type: Sequelize.STRING },
        currency : { type: Sequelize.STRING },
        actualPrice : { type: Sequelize.STRING },
        location : { type: Sequelize.STRING },
        fromDate : { type: Sequelize.STRING },
        toDate : { type: Sequelize.STRING },
        projectId:{type:Sequelize.INTEGER},
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
    }
    ,{
        freezeTableName: true
    });
    const procurementplanVersion = new Version(procurementplan);

    return procurementplan;

};
