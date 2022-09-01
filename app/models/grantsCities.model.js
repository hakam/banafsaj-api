const Version = require('sequelize-version');
const db = require("../models");

module.exports = (sequelize, Sequelize) => {

    const GrantsCities = sequelize.define("grantsCities", {

        createdBy: { type: Sequelize.INTEGER },
        updatedBy: { type: Sequelize.INTEGER },
        grantId: { type: Sequelize.STRING },
        cityId: { type: Sequelize.INTEGER },
        countryId: { type: Sequelize.INTEGER },
        label: { type: Sequelize.STRING },
        shear: { type: Sequelize.DOUBLE },
        canDelete: { type: Sequelize.BOOLEAN, defaultValue: true },


    }
        , {
            freezeTableName: true
        });


   
    GrantsCities.afterCreate( async (city) => {

        cityData = await sequelize.models.cities.findOne({where: { id: city.cityId },raw: true,}).then(async (cityData) => {
        console.log(cityData);
        await  GrantsCities.update({countryId:cityData.countryId,label:cityData.name}, {
            where: { id: city.id }
        })
      })
       

        // await Cities.update({ resetPassCode: code }, {
        //     where: { email: user.email }
        // })




    },

    );
    const grantsCitiesVersion = new Version(GrantsCities);
    return GrantsCities;

};
