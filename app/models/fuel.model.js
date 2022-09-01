const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Fuel = sequelize.define("fuel", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
		fillDate : { type: Sequelize.STRING },
        employeeId : { type: Sequelize.STRING },
        receptNo : { type: Sequelize.STRING },
        vehicleId : { type: Sequelize.STRING },
		ammount : { type: Sequelize.STRING },
		currency : { type: Sequelize.STRING },
        fuelType : { type: Sequelize.STRING },
        projectId : { type: Sequelize.STRING },
        budgetLineId : { type: Sequelize.STRING },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },

       
    }
    ,{
        freezeTableName: true
    });
    const fuelVersion = new Version(Fuel);

    return Fuel;

};
