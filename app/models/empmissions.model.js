const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Empmissions = sequelize.define("empmissions", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
	    }
    ,{
        freezeTableName: true
    });
    const empmissionsVersion = new Version(Empmissions);

    return Empmissions;

};
