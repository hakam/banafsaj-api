const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Tasks = sequelize.define("tasks", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
		officeId: { type: Sequelize.STRING },
        title: { type: Sequelize.STRING },
        dueDate: { type: Sequelize.DATEONLY },
        startDate: { type: Sequelize.DATEONLY },
        description: { type: Sequelize.STRING(1024) },
        assignee: { type: Sequelize.INTEGER },
        tags: { type: Sequelize.STRING },
        comment: { type: Sequelize.STRING },
        status: { type: Sequelize.STRING },
        reportToId: { type: Sequelize.INTEGER },
        projectId: { type: Sequelize.STRING },
        completed: { type: Sequelize.BOOLEAN,defaultValue:false  },
        deleted: { type: Sequelize.BOOLEAN,defaultValue:false  },
        important: { type: Sequelize.INTEGER },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
       
    }
    ,{
        freezeTableName: true
    });
    const tasksVersion = new Version(Tasks);

    return Tasks;

};
