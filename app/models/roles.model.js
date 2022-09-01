const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Roles = sequelize.define("roles", {
        
        dashboardIds:  { type: Sequelize.STRING },
        name : { type: Sequelize.STRING },
        description:  { type: Sequelize.STRING },
     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
	    }
    ,{
        freezeTableName: true
    });
    const rolesVersion = new Version(Roles);

    return Roles;

};
