const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Wavers = sequelize.define("wavers", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
       
    }
    ,{
        freezeTableName: true
    });
    const waversVersion = new Version(Wavers);

    return Wavers;

};
