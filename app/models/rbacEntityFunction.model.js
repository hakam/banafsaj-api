const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const RbacEntityFunction = sequelize.define("rbacEntityFunction", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
        path: { type: Sequelize.STRING },
        action: { type: Sequelize.STRING },
        description: { type: Sequelize.STRING(512) },
        value: { type: Sequelize.INTEGER ,defaultValue:100},
        entity: {type: Sequelize.STRING },
        actionName: { type: Sequelize.STRING },
        entityName: {type: Sequelize.STRING },
        actionType: {type: Sequelize.STRING,defaultValue:"Advance" },
        canView: {type: Sequelize.BOOLEAN ,defaultValue:true },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
    }
    ,{
        freezeTableName: true
    });
 
        const RbacEntityFunctionVersion = new Version(RbacEntityFunction);

    return RbacEntityFunction;

};
