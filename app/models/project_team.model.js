const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Project_team = sequelize.define("project_team", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
        projectId:{type:Sequelize.INTEGER},
        teamIds:{type:Sequelize.INTEGER},
        costShear:{type:Sequelize.DOUBLE,defaultValue: 0},
        bLineCode:{type:Sequelize.STRING},
        upToDate:{type:Sequelize.DATEONLY},
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
    }
    ,{
        freezeTableName: true
    });
    const project_teamVersion = new Version(Project_team);

    return Project_team;

};
