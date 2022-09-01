const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Projectphases = sequelize.define("projectphases", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
		day : { type: Sequelize.STRING },
        label : { type: Sequelize.STRING },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
        projectId: { type: Sequelize.INTEGER },
       
    }
    ,{
        freezeTableName: true
    });
    const projectphasesVersion = new Version(Projectphases);

    return Projectphases;

};
