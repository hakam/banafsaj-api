const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Registerdocs = sequelize.define("registerdocs", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
        prId: { type: Sequelize.STRING },
        vehicleId: { type: Sequelize.INTEGER },
        path: { type: Sequelize.STRING(512) },
        docType: { type: Sequelize.STRING },
        docDate: { type: Sequelize.DATEONLY },
        docnote: { type: Sequelize.STRING },
        docuuid: { type: Sequelize.STRING,defaultValue:"" },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
	    }
    ,{
        freezeTableName: true
    });
    const recruitmentVersion = new Version(Registerdocs);

    return Registerdocs;

};
