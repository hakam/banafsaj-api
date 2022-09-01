const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Shiftbreak = sequelize.define("shiftbreak", {

        createdBy: { type: Sequelize.INTEGER },
        updatedBy: { type: Sequelize.INTEGER },
        officeId: { type: Sequelize.STRING },
        shiftId: { type: Sequelize.INTEGER },
        breakId: { type: Sequelize.INTEGER },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
       
           }
        , {
            freezeTableName: true
        });
        const shiftbreakVersion = new Version(Shiftbreak);

    return Shiftbreak;

};
