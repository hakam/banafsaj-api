const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Recruitment = sequelize.define("recruitment", {

        createdBy: { type: Sequelize.INTEGER },
        updatedBy: { type: Sequelize.INTEGER },
        branchId: { type: Sequelize.STRING },
        employeesRequired: { type: Sequelize.STRING },
        departmentId: { type: Sequelize.INTEGER },
        workPlace: { type: Sequelize.STRING },
        designationId: { type: Sequelize.INTEGER },
        prId: { type: Sequelize.INTEGER },
        typeRecruitment: { type: Sequelize.STRING },
        duration: { type: Sequelize.INTEGER },
        employmentType: { type: Sequelize.STRING },
        name: { type: Sequelize.STRING },
        //toBeadvisedinthefollowingchannels : { type: Sequelize.STRING },
        scope: { type: Sequelize.STRING(1024) },
        ObjectivesOftheProbationPeriod  : { type: Sequelize.STRING },
        scheduleStartDate: { type: Sequelize.DATEONLY },
        canDelete: { type: Sequelize.BOOLEAN, defaultValue: true },
        uuid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4 // Or Sequelize.UUIDV1
        },
    }
        , {
            freezeTableName: true
        });
        const recruitmentVersion = new Version(Recruitment);

    return Recruitment;

};
