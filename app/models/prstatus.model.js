const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Prstatus = sequelize.define("prstatus", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
		description: { type: Sequelize.STRING },
		name : { type: Sequelize.STRING },
               canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
    }
    ,{
        freezeTableName: true
    });
    const prstatusVersion = new Version(Prstatus);

    return Prstatus;

};
