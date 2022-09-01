const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Cities = sequelize.define("cities", {

        createdBy: { type: Sequelize.INTEGER },
        updatedBy: { type: Sequelize.INTEGER },
        countryId: { type: Sequelize.INTEGER },
        officeId: { type: Sequelize.STRING },
        name: {
            type: Sequelize.STRING, set(value) {
                this.setDataValue('name', value.toLowerCase());
            }
        },
        canDelete: { type: Sequelize.BOOLEAN, defaultValue: true },

    }
        , {
            freezeTableName: true
        });

    const citiesVersion = new Version(Cities);

    return Cities;



};
