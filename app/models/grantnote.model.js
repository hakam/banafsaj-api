const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Grantnote = sequelize.define("grantnote", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
		grantsId: { type: Sequelize.INTEGER },
		note: { type: Sequelize.STRING(1024) },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
    }
    ,{
        freezeTableName: true
    });
    const grantnoteVersion = new Version(Grantnote);

    return Grantnote;

};
