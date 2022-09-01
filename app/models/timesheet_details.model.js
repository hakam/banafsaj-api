const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const TimesheetDetails = sequelize.define("timesheet_details", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
		projectId: { type: Sequelize.INTEGER },
		timesheetId : { type: Sequelize.INTEGER },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
       
    }
    ,{
        freezeTableName: true
    });
    const timesheet_detailsVersion = new Version(TimesheetDetails);

    return TimesheetDetails;

};
