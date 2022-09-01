const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Assettype = sequelize.define("assettype", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
        name: { type: Sequelize.STRING,set(value) {
            this.setDataValue('name', value.toLowerCase());
        } },
		des : { type: Sequelize.STRING,set(value) {
            this.setDataValue('des', value.toLowerCase());

        }},
        groupId: { type: Sequelize.INTEGER},
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
       
    }
    ,{
        freezeTableName: true
    });

        const assettypeVersion = new Version(Assettype);

    return Assettype;

};
