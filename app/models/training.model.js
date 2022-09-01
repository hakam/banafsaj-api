const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Training = sequelize.define("training", {

        createdBy: { type: Sequelize.INTEGER },
        updatedBy: { type: Sequelize.INTEGER },
        officeId: { type: Sequelize.STRING },
        name: { type: Sequelize.STRING },
        trainerName: { type: Sequelize.STRING },
        agency: { type: Sequelize.STRING },
        startDate: { type: Sequelize.DATEONLY },
        endDate: { type: Sequelize.DATEONLY },
        trainingLevel: { type: Sequelize.STRING },
        trainingDescription: { type: Sequelize.STRING },
        location: { type: Sequelize.STRING },
        address: { type: Sequelize.STRING },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
           }
        , {
            freezeTableName: true
        });
        const trainingVersion = new Version(Training);

    return Training;

};
