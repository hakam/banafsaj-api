const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Pr_evaluation_result = sequelize.define("pr_evaluation_result", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
		prId: { type: Sequelize.INTEGER },
		projectId : { type: Sequelize.INTEGER },
        vendorId : { type: Sequelize.INTEGER },
		technicalEvaluation : { type: Sequelize.DOUBLE },
		financeEvaluation : { type: Sequelize.DOUBLE },
        technicalWinner : { type: Sequelize.BOOLEAN ,defaultValue:false  },
        financeWinner : { type: Sequelize.BOOLEAN ,defaultValue:false },
        winner : { type: Sequelize.BOOLEAN ,defaultValue:false },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
       
    }
    ,{
        freezeTableName: true
    });
    const pr_evaluation_resultVersion = new Version(Pr_evaluation_result);

    return Pr_evaluation_result;

};
