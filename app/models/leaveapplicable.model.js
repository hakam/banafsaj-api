const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Leaveapplicable = sequelize.define("leaveapplicable", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
        gender: { type: Sequelize.INTEGER },
        maritalStatus: { type: Sequelize.STRING },
        departmentId: { type: Sequelize.STRING },
        designationId: { type: Sequelize.STRING },
        locationId: { type: Sequelize.STRING },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
	    }
    ,{
        freezeTableName: true
    });
    const leaveapplicableVersion = new Version(Leaveapplicable);

    return Leaveapplicable;

};
