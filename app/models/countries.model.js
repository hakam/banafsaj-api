const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Countries = sequelize.define("countries", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
		officeId: { type: Sequelize.STRING },
		canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
        code: { type: Sequelize.STRING },
        name: { type: Sequelize.STRING ,set(value) {
            this.setDataValue('name', value.toLowerCase());
        }  },
        namear: { type: Sequelize.STRING ,set(value) {
            this.setDataValue('namear', value.toLowerCase());
        }  },
        nametr: { type: Sequelize.STRING,set(value) {
            this.setDataValue('nametr', value.toLowerCase());
        }  },
        nationality: { type: Sequelize.STRING ,set(value) {
            this.setDataValue('nationality', value.toLowerCase());
        }  },
        nationalityar: { type: Sequelize.STRING },
        nationalitytr: { type: Sequelize.STRING },
    }
    ,{
        freezeTableName: true
    });
        const countriesVersion = new Version(Countries);

    return Countries;

};
