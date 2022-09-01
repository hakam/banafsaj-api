const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Projectdoc = sequelize.define("projectdoc", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
        projectId: { type: Sequelize.STRING },
        docId: { type: Sequelize.INTEGER },
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
    const projectdocVersion = new Version(Projectdoc);

    return Projectdoc;

};
