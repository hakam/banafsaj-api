const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Programs = sequelize.define("programs", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
		officeId: { type: Sequelize.STRING },
		name : { type: Sequelize.STRING },
        description : { type: Sequelize.STRING(1024) },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
    }
    ,{
        freezeTableName: true
    });
    const programsVersion = new Version(Programs);

    return Programs;

};
