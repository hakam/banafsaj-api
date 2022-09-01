const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const DepartmentShift = sequelize.define("departmentshift", {

        createdBy: { type: Sequelize.INTEGER },
        updatedBy: { type: Sequelize.INTEGER },
        officeId: { type: Sequelize.STRING },
        shiftId: { type: Sequelize.INTEGER },
        departmentId: { type: Sequelize.INTEGER },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
           }
        , {
            freezeTableName: true
        });
        const departmentshiftVersion = new Version(DepartmentShift);

    return DepartmentShift;

};
