const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Task_comment = sequelize.define("task_comment", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
		comment : { type: Sequelize.STRING(1024) },
        taskId: { type: Sequelize.INTEGER },
        employeeId: { type: Sequelize.INTEGER },
        assignee: { type: Sequelize.INTEGER },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
       
    }
    ,{
        freezeTableName: true
    });
    const task_commentVersion = new Version(Task_comment);

    return Task_comment;

};
