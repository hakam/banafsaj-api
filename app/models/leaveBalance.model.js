const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const LeaveBalance = sequelize.define("leaveBalance", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
		nameId : { type: Sequelize.INTEGER },
        employeeId : { type: Sequelize.INTEGER },
        typeId : { type: Sequelize.INTEGER },
		balance : { type: Sequelize.INTEGER },
		unit : { type: Sequelize.STRING },
    }
    ,{
        freezeTableName: true
    });

        const leaveBalanceVersion = new Version(LeaveBalance);

    return LeaveBalance;

};
