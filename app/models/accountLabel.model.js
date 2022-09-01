const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const AccountLabel = sequelize.define("accountLabel", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
		name : { type: Sequelize.STRING ,
            set(value) {
                this.setDataValue('name',value.toLowerCase());
              }
        },
        description : { type: Sequelize.STRING },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
       
    }
    ,{
        freezeTableName: true,
        deletedAt: 'destroyTime',
        paranoid: true,
        version: true,
    });

    const accountLabelVersion = new Version(AccountLabel);

    return AccountLabel;

};
