const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const News = sequelize.define("news", {

        createdBy: { type: Sequelize.INTEGER },
        updatedBy: { type: Sequelize.INTEGER },
        officeId: { type: Sequelize.STRING },
        description: { type: Sequelize.STRING },
        dateofpublish: { type: Sequelize.DATEONLY },
        endDate: { type: Sequelize.DATEONLY },
        departmentId: {  type: Sequelize.INTEGER  },
        status :{type: Sequelize.BOOLEAN ,defaultValue:false },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
           }
        , {
            freezeTableName: true
        });
        const newsVersion = new Version(News);

    return News;

};
