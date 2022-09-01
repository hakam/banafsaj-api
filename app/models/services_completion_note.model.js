const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Servicescompletionnote = sequelize.define("servicescompletionnote", {

        createdBy: { type: Sequelize.INTEGER },
        updatedBy: { type: Sequelize.INTEGER },
        prId :     { type: Sequelize.INTEGER },
        projectId :{ type: Sequelize.INTEGER },
        lineItem : { type: Sequelize.STRING },
        description : { type: Sequelize.STRING },
        itemId :   { type: Sequelize.INTEGER },
        completionDate : { type: Sequelize.STRING },
        quality :   { type: Sequelize.STRING },
        comment :   { type: Sequelize.STRING },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
    }
    ,{
        freezeTableName: true
    });
    const servicescompletionnoteVersion = new Version(Servicescompletionnote);

    return Servicescompletionnote;

};
