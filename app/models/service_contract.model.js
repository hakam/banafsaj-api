const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Service_contract = sequelize.define("service_contract", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
		prId: { type: Sequelize.INTEGER },
		name : { type: Sequelize.STRING },
        scope : { type: Sequelize.STRING },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
       
    }
    ,{
        freezeTableName: true
    });
    const service_contractVersion = new Version(Service_contract);

    return Service_contract;

};
