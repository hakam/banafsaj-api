const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Holidays = sequelize.define("holidays", {

        createdBy: { type: Sequelize.INTEGER },
        updatedBy: { type: Sequelize.INTEGER },
        name: { type: Sequelize.STRING },
        description: { type: Sequelize.STRING },
        startDate: { type: Sequelize.DATEONLY },
        endDate: { type: Sequelize.DATEONLY },
        applicableShiftId: { type: Sequelize.STRING },
        applicableBranchId: { type: Sequelize.STRING },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
    }
        , {
            freezeTableName: true
        });
        Holidays.beforeCreate((holidays) => {
            if(holidays.name)
            holidays.name = holidays.name.toLowerCase();
            if(holidays.description)
            holidays.description = holidays.description.toLowerCase();
            return holidays
            });
            const holidaysVersion = new Version(Holidays);

    return Holidays;

};
