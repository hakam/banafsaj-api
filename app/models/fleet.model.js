const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Fleet = sequelize.define("fleet", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
		vendorId : { type: Sequelize.STRING },
        plateNo : { type: Sequelize.STRING },
        vehicleModel : { type: Sequelize.STRING },
        vehicleYear : { type: Sequelize.STRING },
        fuelType : { type: Sequelize.STRING },
        vehicleBrand : { type: Sequelize.STRING },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },

       
    }
    ,{
        freezeTableName: true
    });
    Fleet.beforeCreate((fleet) => {
        if(fleet.vehicleModel)
        fleet.vehicleModel = fleet.vehicleModel.toLowerCase();
        return fleet
        });
        const fleetVersion = new Version(Fleet);

    return Fleet;

};
