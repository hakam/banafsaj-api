const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Mediatasks = sequelize.define("mediatasks", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
        name : { type: Sequelize.STRING },
        startDate : { type: Sequelize.DATEONLY },
        inDate : { type: Sequelize.DATEONLY },
		description: { type: Sequelize.STRING(1024) },
        prId: { type: Sequelize.INTEGER },
        uuid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4 // Or Sequelize.UUIDV1
        },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
    }
    ,{
        freezeTableName: true
    });
    const mediatasksVersion = new Version(Mediatasks);

    return Mediatasks;

};