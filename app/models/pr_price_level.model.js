const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Prpricelevel = sequelize.define("prpricelevel", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
        donorId: { type: Sequelize.INTEGER },
		name : { type: Sequelize.STRING(1024) },
        documents: { type: Sequelize.STRING(1024) },
        from: { type: Sequelize.DOUBLE },
        to: { type: Sequelize.DOUBLE },
        currency: { type: Sequelize.STRING },
        period: { type: Sequelize.INTEGER },
        quoteCount: { type: Sequelize.INTEGER },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
       
    }
    ,{
        freezeTableName: true
    });
    const prpricelevelVersion = new Version(Prpricelevel);

    return Prpricelevel;

};
