const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const distributionRequestItems = sequelize.define("distributionRequestItems", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
        drId : { type: Sequelize.INTEGER },
        assetId : { type: Sequelize.INTEGER },
        quantity:{type:Sequelize.INTEGER},
        deliveredDate:{type:Sequelize.DATEONLY},
        beneficiaryId:{type:Sequelize.INTEGER},
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },

    }
    ,{
        freezeTableName: true
    });

        const distributionRequestItemsVersion = new Version(distributionRequestItems);

    return distributionRequestItems;

};
