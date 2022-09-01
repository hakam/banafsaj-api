const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Trainingemployee = sequelize.define("trainingemployee", {

        createdBy: { type: Sequelize.INTEGER },
        updatedBy: { type: Sequelize.INTEGER },
        officeId: { type: Sequelize.STRING },
        trainingId: { type: Sequelize.INTEGER },
        employeeId: { type: Sequelize.STRING },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
           }
        , {
            freezeTableName: true
        });
        const trainingemployeeVersion = new Version(Trainingemployee);

    return Trainingemployee;

};
