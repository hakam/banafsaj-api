const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Prstepsstatus = sequelize.define("prstepsstatus", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
		prId : { type: Sequelize.STRING },
        stepId : { type: Sequelize.STRING },
        startdate : { type: Sequelize.STRING },
        enddate : { type: Sequelize.STRING },
        note : { type: Sequelize.STRING },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
       
    }
    ,{
        freezeTableName: true
    });
    const prstepsstatusVersion = new Version(Prstepsstatus);

    return Prstepsstatus;

};
