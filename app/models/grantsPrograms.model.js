const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const GrantsPrograms = sequelize.define("grantsPrograms", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
		grantId: { type: Sequelize.STRING },
        programId: { type: Sequelize.INTEGER },
        shear: { type: Sequelize.DOUBLE },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
      

    }
    ,{
        freezeTableName: true
    });

    
        const grantsProgramsVersion = new Version(GrantsPrograms);

    return GrantsPrograms;

};
