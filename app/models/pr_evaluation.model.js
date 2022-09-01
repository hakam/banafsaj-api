const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Pr_evaluation = sequelize.define("pr_evaluation", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
        prId: { type: Sequelize.INTEGER },
        projectId: { type: Sequelize.INTEGER },
        evaluationId: { type: Sequelize.INTEGER },
        vendorId: { type: Sequelize.INTEGER },
        employeeId: { type: Sequelize.INTEGER },
        evaluationScore: { type: Sequelize.DOUBLE },
        evaluationType: { type: Sequelize.STRING },
        mandatory :{type: Sequelize.BOOLEAN ,defaultValue:false },
    }
    ,{
        freezeTableName: true
    });
    const pr_evaluationVersion = new Version(Pr_evaluation);

    return Pr_evaluation;

};
