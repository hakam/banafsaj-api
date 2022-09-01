const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Payroll = sequelize.define("payroll", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
		employeeId : { type: Sequelize.INTEGER },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
       
    }
    ,{
        freezeTableName: true
    });
    const payrollVersion = new Version(Payroll);

    return Payroll;

};
