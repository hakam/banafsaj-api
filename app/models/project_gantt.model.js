const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Project_gantt = sequelize.define("project_gantt", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
		projectId: { type: Sequelize.INTEGER },
        name : { type: Sequelize.STRING },
        startDate:  { type: Sequelize.DATEONLY },
        endDate: { type: Sequelize.DATEONLY },
        duration: { type: Sequelize.INTEGER },
        progress:  { type: Sequelize.INTEGER },
        parentId: { type: Sequelize.INTEGER },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
    }
    ,{
        freezeTableName: true
    });
    const project_ganttVersion = new Version(Project_gantt);

    return Project_gantt;

};
