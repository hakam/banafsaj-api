const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Empleaves = sequelize.define("empleaves", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
        typeofLeave: { type: Sequelize.INTEGER },
		nameId: { type: Sequelize.INTEGER },
		typeId: { type: Sequelize.INTEGER },
		description: { type: Sequelize.STRING(512) },
	    leaveDuration: { type: Sequelize.INTEGER },
	    startingDate: { type: Sequelize.DATE },
	    endingDate: { type: Sequelize.DATE },
	    backToWork: { type: Sequelize.DATE },
		employeeId: { type: Sequelize.INTEGER },
		reportTo: { type: Sequelize.STRING },
		status: { type: Sequelize.STRING },
		note: { type: Sequelize.STRING },
		completed: {type: Sequelize.BOOLEAN ,defaultValue:0 },
		hrReview: {type: Sequelize.BOOLEAN ,defaultValue:0 },
		reportToReview: {type: Sequelize.BOOLEAN ,defaultValue:0 },
		paidType:  {type: Sequelize.BOOLEAN},
		canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
		unit: { type: Sequelize.STRING },
		attachment: { type: Sequelize.STRING},
		organization: { type: Sequelize.INTEGER,defaultValue:0  },
		sgk: { type: Sequelize.INTEGER,defaultValue:0  },
	    }
    ,{
        freezeTableName: true
    });
	const empleavesVersion = new Version(Empleaves);

    return Empleaves;

};
