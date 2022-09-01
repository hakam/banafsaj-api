const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Projectactivity = sequelize.define("projectactivity", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
        name : { type: Sequelize.STRING },
		description: { type: Sequelize.STRING },
        projectId: { type: Sequelize.INTEGER },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
    }
    ,{
        freezeTableName: true
    });
    const projectactivityVersion = new Version(Projectactivity);

    return Projectactivity;

};