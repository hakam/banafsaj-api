const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Grantsdocs = sequelize.define("grantsdocs", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
        grantId: { type: Sequelize.STRING },
        docId: { type: Sequelize.INTEGER },
        path: { type: Sequelize.STRING(512) },
        docType: { type: Sequelize.STRING },
        docDate: { type: Sequelize.DATEONLY },
        docnote: { type: Sequelize.STRING },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
        docuuid: { type: Sequelize.STRING,defaultValue:"" },
	    }
    ,{
        freezeTableName: true
    });
    const grantsdocsVersion = new Version(Grantsdocs);

    return Grantsdocs;

};
