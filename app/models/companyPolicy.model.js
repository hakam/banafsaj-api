const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const CompanyPolicy = sequelize.define("companyPolicy", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
        path: { type: Sequelize.STRING(512) },
        name: { type: Sequelize.STRING },
        docDate: { type: Sequelize.DATEONLY },
        docnote: { type: Sequelize.STRING },
        docType: { type: Sequelize.STRING },

        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
	    }
    ,{
        freezeTableName: true
    });
    const companyPolicyVersion = new Version(CompanyPolicy);

    return CompanyPolicy;

};
