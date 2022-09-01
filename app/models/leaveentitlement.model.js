const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Leaveentitlement = sequelize.define("leaveentitlement", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
        after: { type: Sequelize.INTEGER },
        unit: { type: Sequelize.STRING },
        accrual: { type: Sequelize.STRING },
        onDay: { type: Sequelize.STRING },
        onMonth: { type: Sequelize.STRING },
        noOfDays: { type: Sequelize.INTEGER },
        reset: { type: Sequelize.STRING },
        resetOnDay: { type: Sequelize.STRING },
        resetOnMonth: { type: Sequelize.STRING },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
	    }
    ,{
        freezeTableName: true
    });
    const leaveentitlementVersion = new Version(Leaveentitlement);

    return Leaveentitlement;

};
