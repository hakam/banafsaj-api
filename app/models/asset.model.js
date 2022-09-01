const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Asset = sequelize.define("asset", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
		groupId : { type: Sequelize.INTEGER },
        assetTypeId : { type: Sequelize.INTEGER },
        Code : { type: Sequelize.STRING },
        description : { type: Sequelize.STRING },
        brand : { type: Sequelize.STRING ,
            set(value) {
                this.setDataValue('brand',value.toLowerCase());
              }},
        model : { type: Sequelize.STRING,
            set(value) {
                this.setDataValue('model',value.toLowerCase());
              } },
        serialNo : { type: Sequelize.STRING },
        dateOfpurchase : { type: Sequelize.STRING },
        lastDateForGuaranty : { type: Sequelize.STRING },
        vendorId : { type: Sequelize.STRING },
        donorId : { type: Sequelize.STRING },
        value : { type: Sequelize.STRING,
            set(value) {
                this.setDataValue('value',value.toLowerCase());
              }  },
        unitId: { type: Sequelize.INTEGER },
		branchId : { type: Sequelize.INTEGER },
        warehouse : { type: Sequelize.STRING },
        warehouseEntry : { type: Sequelize.STRING },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
        poId : { type: Sequelize.INTEGER },
        prId: { type: Sequelize.INTEGER },
    }
    ,{
        freezeTableName: true
    });
        const assetVersion = new Version(Asset);

    return Asset;

};
