const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Task_status = sequelize.define("task_status", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
		name : { type: Sequelize.STRING },
        actionStep: { type: Sequelize.STRING },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
       
    }
    ,{
        freezeTableName: true
    });
    const task_statusVersion = new Version(Task_status);

    return Task_status;

};
