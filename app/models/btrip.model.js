const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const bTrip = sequelize.define("bTrip", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
		employeeId: { type: Sequelize.INTEGER },
		reportToId: { type: Sequelize.INTEGER },
		purpose: { type: Sequelize.STRING(1024) },
		internal:{type: Sequelize.BOOLEAN ,defaultValue:true },
		leaveUnit: { type: Sequelize.STRING },
		startingDate: { type: Sequelize.DATE },
	    endingDate: { type: Sequelize.DATE },
        countryId: { type: Sequelize.INTEGER },
		cityId: { type: Sequelize.STRING },
	    leaveDuration: { type: Sequelize.INTEGER },
	    backToWork: { type: Sequelize.DATE },
	    from: { type: Sequelize.STRING},
		to: { type: Sequelize.STRING},
		canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
		approvedByHOD:{type: Sequelize.BOOLEAN ,defaultValue:false },
		notedByHr:{type: Sequelize.BOOLEAN ,defaultValue:false },
		transType:{type: Sequelize.STRING},
		accommodation :{type: Sequelize.BOOLEAN ,defaultValue:false },
		status: { type: Sequelize.STRING },
		note: { type: Sequelize.STRING },
		completed: {type: Sequelize.BOOLEAN ,defaultValue:0 },
		hrReview: {type: Sequelize.BOOLEAN ,defaultValue:0 },
		reportToReview: {type: Sequelize.BOOLEAN ,defaultValue:0 },
	    }
    ,{
        freezeTableName: true
    });
	const bTripVersion = new Version(bTrip);
    return bTrip;

};
