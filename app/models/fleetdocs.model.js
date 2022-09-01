const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Fleetdocs = sequelize.define("fleetdocs", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
        fleetId: { type: Sequelize.STRING },
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
    const fleetdocsVersion = new Version(Fleetdocs);

    return Fleetdocs;

};
