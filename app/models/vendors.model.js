const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Vendors = sequelize.define("vendors", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
		name : { type: Sequelize.STRING },
        cityId : { type: Sequelize.INTEGER },
        countryId : { type: Sequelize.INTEGER },
        postCode : { type: Sequelize.STRING },
        phone : { type: Sequelize.STRING },
        email : { type: Sequelize.STRING },
        website : { type: Sequelize.STRING },
        contactName : { type: Sequelize.STRING },
        contactEmail : { type: Sequelize.STRING },
        contactPhone: { type: Sequelize.STRING },
        registerCode: { type: Sequelize.STRING },
        taxId: { type: Sequelize.STRING },
        taxCenter: { type: Sequelize.STRING },
        bankName: { type: Sequelize.STRING },
        bankAccountno: { type: Sequelize.STRING },
        accountHoldername: { type: Sequelize.STRING },
        accountCurrency: { type: Sequelize.STRING },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
        vendorSectorId: { type: Sequelize.INTEGER },
          
    }
    ,{
        freezeTableName: true
    });
    const vendorsVersion = new Version(Vendors);

    return Vendors;

};
