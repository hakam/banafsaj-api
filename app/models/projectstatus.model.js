const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Projectstatus = sequelize.define("projectstatus", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
		description: { type: Sequelize.STRING },
		name : { type: Sequelize.STRING },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
       
    }
    ,{
        freezeTableName: true
    });
    const projectstatusVersion = new Version(Projectstatus);

    return Projectstatus;

};
