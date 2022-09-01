const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Notifications = sequelize.define("notifications", {

     	createdBy: { type: Sequelize.INTEGER, defaultValue:1},
	    updatedBy: { type: Sequelize.INTEGER, defaultValue:1},
		employeeId : { type: Sequelize.INTEGER},
        departmentId: { type: Sequelize.INTEGER},
        message : { type: Sequelize.STRING },
        path : { type: Sequelize.STRING },
        sender: { type: Sequelize.INTEGER},
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
        isRead:{type: Sequelize.BOOLEAN ,defaultValue:false },
    }
    ,{
        freezeTableName: true,
    });

    const accountLabelVersion = new Version(Notifications);

    return Notifications;

};
 