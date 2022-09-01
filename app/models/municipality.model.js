const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Municipality = sequelize.define("municipality", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
		officeId: { type: Sequelize.STRING },
		name : { type: Sequelize.STRING },
        cityId: { type: Sequelize.INTEGER },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
       
    }
    ,{
        freezeTableName: true
    });
    const municipalityVersion = new Version(Municipality);

    return Municipality;

};
