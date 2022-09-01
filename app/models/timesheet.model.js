const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Timesheet = sequelize.define("timesheet", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
		employeeId : { type: Sequelize.INTEGER },
        projectId : { type: Sequelize.INTEGER },
        name : { type: Sequelize.STRING },
        number: { type: Sequelize.INTEGER },
        dayNo: { type: Sequelize.INTEGER },
        date: { type: Sequelize.DATEONLY },
        year: { type: Sequelize.INTEGER},
        month : { type: Sequelize.INTEGER},
        weekEnd:{type: Sequelize.BOOLEAN ,defaultValue:false },
        time: { type: Sequelize.DOUBLE },
        leave:{type: Sequelize.BOOLEAN ,defaultValue:false },
        leaveDuration: { type: Sequelize.DOUBLE },
        leaveName: { type: Sequelize.INTEGER },
        holiday:{type: Sequelize.BOOLEAN ,defaultValue:false },
        timeSpent: { type: Sequelize.DOUBLE,defaultValue:0 },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
       
    }
    ,{
        freezeTableName: true
    });
    const timesheetVersion = new Version(Timesheet);

    return Timesheet;

};
