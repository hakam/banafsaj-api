const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Vehicleservices = sequelize.define("vehicleservices", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
		serviceType : { type: Sequelize.STRING },
        serviceDate : { type: Sequelize.STRING },
        ammount : { type: Sequelize.STRING },
        currency : { type: Sequelize.STRING },
        documentPath : { type: Sequelize.STRING },
        vehicleId : { type: Sequelize.STRING },
         canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
           
    }
    ,{
        freezeTableName: true
    });
    const vehicleservicesVersion = new Version(Vehicleservices);

    return Vehicleservices;

};
