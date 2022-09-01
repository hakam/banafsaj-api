const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const LeaveNames = sequelize.define("leaveNames", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
        name: { type: Sequelize.STRING },
        description: { type: Sequelize.STRING(512) },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
	    }
    ,{
        freezeTableName: true
    });
    LeaveNames.beforeCreate((leaveNames) => {
        if(leaveNames.name)
        leaveNames.name = leaveNames.name.toLowerCase();
        if(leaveNames.description)
        leaveNames.description = leaveNames.description.toLowerCase();
        return leaveNames
        });
        const leaveNamesVersion = new Version(LeaveNames);

    return LeaveNames;

};
