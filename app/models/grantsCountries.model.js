const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const GrantsCountries = sequelize.define("grantsCountries", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
		grantId: { type: Sequelize.STRING },
        countryId: { type: Sequelize.INTEGER },
        shear: { type: Sequelize.DOUBLE },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
      

    }
    ,{
        freezeTableName: true
    });

    
        const grantsCountriesVersion = new Version(GrantsCountries);

    return GrantsCountries;

};
