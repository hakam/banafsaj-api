const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Emptraining = sequelize.define("emptraining", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
        employeeId: { type: Sequelize.STRING },
		trainerName: { type: Sequelize.STRING },
		trainingName: { type: Sequelize.STRING },
		level: { type: Sequelize.STRING },
		startDate: { type: Sequelize.DATEONLY },
		endDate: { type: Sequelize.DATEONLY },
		score: { type: Sequelize.STRING },
		canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
		uuid:{
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4 // Or Sequelize.UUIDV1
		  }
		  
       
	    }
    ,{
        freezeTableName: true
    });
	Emptraining.beforeCreate((emptraining) => {
		if(emptraining.trainerName)
		emptraining.trainerName = emptraining.trainerName.toLowerCase();
		return emptraining
		});
		const emptrainingVersion = new Version(Emptraining);

    return Emptraining;

};
