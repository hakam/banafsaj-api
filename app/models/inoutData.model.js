const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const InoutData = sequelize.define("inoutData", {

        createdBy: { type: Sequelize.INTEGER },
        updatedBy: { type: Sequelize.INTEGER },
        no:{ type: Sequelize.INTEGER },
        attendance_date:{ type: Sequelize.STRING },
        time_in:{ type: Sequelize.DATE },
        time_out:{ type: Sequelize.DATE },
        total: { type: Sequelize.DOUBLE },
        departmentId:{ type: Sequelize.INTEGER},
        branchId:{ type: Sequelize.INTEGER },
        code:{ type: Sequelize.STRING,set(value) {
            this.setDataValue('code', value.toLowerCase());
        } },
        
    }
        , {
            freezeTableName: true
        });

    const InoutDataVersion = new Version(InoutData);

    return InoutData;



};
