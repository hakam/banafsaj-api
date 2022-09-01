const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Listspermission = sequelize.define("listspermission", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
		listId: { type: Sequelize.INTEGER },
        roleId: { type: Sequelize.INTEGER },
        view :{type: Sequelize.BOOLEAN ,defaultValue:false },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },

    }
    ,{
        freezeTableName: true
    });
    const listspermissionVersion = new Version(Listspermission);

    return Listspermission;

};
