const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Vendorsectors = sequelize.define("vendorsectors", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
        name : { type: Sequelize.STRING },
        description : { type: Sequelize.STRING(1024) },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },

    }
    ,{
        freezeTableName: true
    });
    const vendorsectorsVersion = new Version(Vendorsectors);

    return Vendorsectors;

};
