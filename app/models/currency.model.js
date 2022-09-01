const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Currency = sequelize.define("currency", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
        name: { type: Sequelize.STRING ,set(value) {
            this.setDataValue('name', value.toLowerCase());
        } },
		code : { type: Sequelize.STRING,set(value) {
            this.setDataValue('code', value.toLowerCase());
        }  },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
    }
    ,{
        freezeTableName: true
    });

        const currencyVersion = new Version(Currency);

    return Currency;

};
