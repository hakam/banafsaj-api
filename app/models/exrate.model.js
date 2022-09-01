const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Exrate = sequelize.define("exrate", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
        exdate: { type: Sequelize.DATEONLY },
        fromCUR: { type: Sequelize.STRING },
        toCUR: { type: Sequelize.STRING },
        rate: { type: Sequelize.DOUBLE },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
    }
    ,{
        freezeTableName: true
    });
    const exrateVersion = new Version(Exrate);

    return Exrate;

};
