const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Assetgroup = sequelize.define("assetgroup", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
        name: { type: Sequelize.STRING,set(value) {
            this.setDataValue('name', value.toLowerCase());
        } },
		des : { type: Sequelize.STRING },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
    }
    ,{
        freezeTableName: true
    });

        const assetgroupVersion = new Version(Assetgroup);

    return Assetgroup;

};
