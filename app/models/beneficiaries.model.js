const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Beneficiaries = sequelize.define("beneficiaries", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
        donercode: { type: Sequelize.STRING },
        code: { type: Sequelize.STRING },
        applicationDate: { type: Sequelize.DATEONLY },
        municipalityId: { type: Sequelize.INTEGER },
        cityId: { type: Sequelize.INTEGER },
        name: { type: Sequelize.STRING,set(value) {
            this.setDataValue('name', value.toLowerCase());
        }  },
        surname: { type: Sequelize.STRING ,set(value) {
            this.setDataValue('surname', value.toLowerCase());
        } },
        tc: { type: Sequelize.STRING },
        placeofBirth: { type: Sequelize.STRING },
        idType: { type: Sequelize.STRING },
        gender: { type: Sequelize.STRING },
        nationalityId: { type: Sequelize.STRING },
        birthDate: { type: Sequelize.DATEONLY },
        age: { type: Sequelize.DOUBLE },
        mobile: { type: Sequelize.STRING },
        totalFamilyMemeber: { type: Sequelize.INTEGER },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
    }
    ,{
        freezeTableName: true
    });
    const beneficiariesVersion = new Version(Beneficiaries);

    return Beneficiaries;

};
