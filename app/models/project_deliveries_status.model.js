const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Projectdeliveriesstatus = sequelize.define("projectdeliveriesstatus", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
        projectDelId:{type:Sequelize.INTEGER},
        projectId:{type:Sequelize.INTEGER},
        name:{type:Sequelize.STRING},
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
       
       
    }
    ,{
        freezeTableName: true
    });
    const projectdeliveriesstatusVersion = new Version(Projectdeliveriesstatus);

    return Projectdeliveriesstatus;

};
