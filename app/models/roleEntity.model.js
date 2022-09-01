const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const RoleEntity = sequelize.define("roleEntity", {
        createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
        roleId : { type: Sequelize.INTEGER },
        permissionId:  { type: Sequelize.INTEGER },
        path: { type: Sequelize.STRING},
        action: { type:Sequelize.STRING},
        entity: { type: Sequelize.STRING},
        value:  { type: Sequelize.INTEGER },
        actionName: { type: Sequelize.STRING },
        entityName: {type: Sequelize.STRING },
        actionType: {type: Sequelize.STRING },
        description: { type: Sequelize.STRING(512) },
        canView: {type: Sequelize.BOOLEAN },

       
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
	    }
    ,{
        freezeTableName: true
    });
    const RoleEntityVersion = new Version(RoleEntity);

    return RoleEntity;

};
