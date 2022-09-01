const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Grants = sequelize.define("grants", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
		officeId: { type: Sequelize.STRING },
        grantName: { type: Sequelize.STRING },
        donorId: { type: Sequelize.INTEGER },
        email: { type: Sequelize.STRING },
        grantsDate: { type: Sequelize.DATEONLY },
        expireDate: { type: Sequelize.DATEONLY },
        grantAmount: { type: Sequelize.DOUBLE },
        currency: { type: Sequelize.STRING },
        exchangeRate: { type: Sequelize.STRING },
        programId: { type: Sequelize.INTEGER },
        statusId: { type: Sequelize.INTEGER },
        comments: { type: Sequelize.STRING(512) },
        description: { type: Sequelize.STRING(1024) },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
        ceoApp :{type: Sequelize.BOOLEAN ,defaultValue:false },
        ceoComments: { type: Sequelize.STRING(1024) },
        prPolicy :{type: Sequelize.BOOLEAN ,defaultValue:false },
        cityId: { type: Sequelize.STRING },
        countryId: { type: Sequelize.STRING },
        webLink: { type: Sequelize.STRING(512) },
        refCode: { type: Sequelize.STRING },
        adminFee: { type: Sequelize.DOUBLE },
    }
    ,{
        freezeTableName: true
    });
    Grants.beforeCreate((grants) => {
        if(grants.description)
        grants.description = grants.description.toLowerCase();
        if(grants.grantName)
        grants.grantName = grants.grantName.toLowerCase();
        return grants
        });
        const grantsVersion = new Version(Grants);

    return Grants;

};
