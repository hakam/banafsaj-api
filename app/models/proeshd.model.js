const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Proeshd = sequelize.define("proeshd", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
        name : { type: Sequelize.STRING },
        description:  { type: Sequelize.STRING },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
    }
    ,{
        freezeTableName: true
    });
    const proeshdVersion = new Version(Proeshd);

    return Proeshd;

};
