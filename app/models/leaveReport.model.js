const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const LeaveReport = sequelize.define("leaveReport", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
        name: { type: Sequelize.STRING },
        count: { type: Sequelize.INTEGER },
        empId: { type: Sequelize.INTEGER },
        taken: { type: Sequelize.INTEGER },
        balance: { type: Sequelize.INTEGER },
        disabled:{type: Sequelize.BOOLEAN },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
      
	    }
    ,{
        freezeTableName: true
    });
    const LeaveReportVersion = new Version(LeaveReport);

    return LeaveReport;

};
