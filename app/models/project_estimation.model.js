const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Projectestimation = sequelize.define("projectestimation", {

        createdBy: { type: Sequelize.INTEGER },
        updatedBy: { type: Sequelize.INTEGER },
        projectId: { type: Sequelize.INTEGER },
        no: { type: Sequelize.STRING },
        Description: { type: Sequelize.STRING },
        donorShare: { type: Sequelize.DOUBLE ,defaultValue: 0},
        quantity: { type: Sequelize.DOUBLE ,defaultValue: 0},
        unit: { type: Sequelize.STRING },
        period: { type: Sequelize.DOUBLE },
        periodUnit: { type: Sequelize.STRING },
        unitValue: { type: Sequelize.DOUBLE },
        total: { type: Sequelize.DOUBLE ,defaultValue: 0},
        currency: { type: Sequelize.STRING },
        costShare: { type: Sequelize.DOUBLE,defaultValue: 0 },
        shearDonor: { type: Sequelize.STRING },
        totalProjectCost: { type: Sequelize.DOUBLE,defaultValue: 0 },
        accountLabelId: { type: Sequelize.INTEGER },
        proeshdId: { type: Sequelize.INTEGER },
        totalBlocked: { type: Sequelize.DOUBLE ,defaultValue: 0},
        totalspent: { type: Sequelize.DOUBLE,defaultValue: 0 },
        canDelete: { type: Sequelize.BOOLEAN, defaultValue: true },
   
    }
        , {
            freezeTableName: true
        });
    const projectestimationVersion = new Version(Projectestimation);

    return Projectestimation;

};
