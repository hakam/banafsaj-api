const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Shift = sequelize.define("shift", {

        createdBy: { type: Sequelize.INTEGER },
        updatedBy: { type: Sequelize.INTEGER },
        officeId: { type: Sequelize.STRING },
        name: { type: Sequelize.STRING },
        from: { type: Sequelize.TIME },
        to: { type: Sequelize.TIME },
        weekend: { type: Sequelize.STRING },
        breakId: { type: Sequelize.INTEGER },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
    }
        , {
            freezeTableName: true
        });
        const servicescompletionnoteVersion = new Version(Shift);

    return Shift;

};
