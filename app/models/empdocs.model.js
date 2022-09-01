const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Empdocs = sequelize.define("empdocs", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
        employeeId: { type: Sequelize.STRING },
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
    const empdocsVersion = new Version(Empdocs);

    return Empdocs;

};
