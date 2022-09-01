const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Projects = sequelize.define("projects", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
		officeId: { type: Sequelize.STRING },
		name : { type: Sequelize.STRING },
        donorId: { type: Sequelize.INTEGER },
        sDate: { type: Sequelize.DATEONLY },
        exDate: { type: Sequelize.DATEONLY },
        amount: { type: Sequelize.DOUBLE },
        currency: { type: Sequelize.STRING },
        exchangeRate: { type: Sequelize.STRING },
        programId: { type: Sequelize.INTEGER },
        statusId: { type: Sequelize.INTEGER,defaultValue:1 },
        ceoComments: { type: Sequelize.STRING(1024) },
        ceoApprovalDate: { type: Sequelize.DATEONLY },
        description: { type: Sequelize.STRING(1024) },
        pmId: { type: Sequelize.INTEGER },
        narrativePDF: { type: Sequelize.STRING },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
        prPolicy :{type: Sequelize.BOOLEAN ,defaultValue:false },
        prCode: { type: Sequelize.STRING },
        adminFee: { type: Sequelize.DOUBLE },
    }
    ,{
        freezeTableName: true
    });
    const projectsVersion = new Version(Projects);

    return Projects;

};
