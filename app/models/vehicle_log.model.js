const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Vehiclelog = sequelize.define("vehiclelog", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
		logDate : { type: Sequelize.STRING },
        description: { type: Sequelize.STRING(1024) },
        start : { type: Sequelize.STRING },
        startTime : { type: Sequelize.STRING },
        arrival : { type: Sequelize.STRING },
        endTime : { type: Sequelize.STRING },
        startOdo : { type: Sequelize.STRING },
        finishOdo : { type: Sequelize.STRING },
        total : { type: Sequelize.STRING },
        driverId : { type: Sequelize.INTEGER },
        employeeId : { type: Sequelize.INTEGER },
        vehicleId : { type: Sequelize.INTEGER },
        projectId : { type: Sequelize.INTEGER },
        projectLine : { type: Sequelize.INTEGER },
        status: { type: Sequelize.STRING },
        completed: { type: Sequelize.BOOLEAN ,defaultValue:0},
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
        withDriver :{type: Sequelize.BOOLEAN  },
        bTripId: { type: Sequelize.INTEGER },


     
    }
    ,{
        freezeTableName: true
    });
    const vehiclelogVersion = new Version(Vehiclelog);

    return Vehiclelog;

};
