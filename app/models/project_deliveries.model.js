const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Projectdeliveries = sequelize.define("projectdeliveries", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
        projectId:{type:Sequelize.INTEGER},
        name:{type:Sequelize.STRING},
        target: {type:Sequelize.INTEGER},
        batches: {type:Sequelize.INTEGER},
        total: {type:Sequelize.INTEGER},
        achievement:{type:Sequelize.INTEGER},
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
    }
    ,{
        freezeTableName: true
    });
    const projectdeliveriesVersion = new Version(Projectdeliveries);

    return Projectdeliveries;

};
