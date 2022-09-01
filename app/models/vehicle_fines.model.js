const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Vehiclefines = sequelize.define("vehiclefines", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
		fineDate : { type: Sequelize.STRING },
        ammount : { type: Sequelize.STRING },
		location : { type: Sequelize.STRING },
        type : { type: Sequelize.STRING },
        vehicleId : { type: Sequelize.STRING },
		employeeId : { type: Sequelize.STRING },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },



       
    }
    ,{
        freezeTableName: true
    });
    const vehiclefinesVersion = new Version(Vehiclefines);

    return Vehiclefines;

};
