module.exports = (sequelize, Sequelize) => {

    const LeaveReportView = sequelize.define("leaveReportView", {
       

        empId: { type: Sequelize.INTEGER,primaryKey: true },
        aleaveCount: { type: Sequelize.INTEGER },
        aleaveTaken: { type: Sequelize.INTEGER },
        aleaveBalance: { type: Sequelize.INTEGER },
        sleaveCount: { type: Sequelize.INTEGER },
        sleaveTaken: { type: Sequelize.INTEGER },
        sleaveBalance: { type: Sequelize.INTEGER },
     
           }
        , {
            freezeTableName: true,
            timestamps: false,
        });


    return LeaveReportView;

};
