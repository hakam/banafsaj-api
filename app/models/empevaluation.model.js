const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Empevaluation = sequelize.define("empevaluation", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
        employeeId: { type: Sequelize.STRING },
        designationId: { type: Sequelize.INTEGER },
		departmentId: { type: Sequelize.INTEGER },
        evaluationDate: { type: Sequelize.DATEONLY },
        finalScore: { type: Sequelize.DOUBLE },
        correspondingGrade: { type: Sequelize.STRING },
        recommendation: { type: Sequelize.STRING },
        dmId: { type: Sequelize.INTEGER },
        evaluatedbyDm: { type: Sequelize.STRING },
        dmDate : { type: Sequelize.DATEONLY },
        hodId: { type: Sequelize.INTEGER },
        EvaluationHODreview: { type: Sequelize.STRING },
        hodDate: { type: Sequelize.DATEONLY },
        hrId: { type: Sequelize.INTEGER },
        HRDecision: { type: Sequelize.STRING },
        hrDate: { type: Sequelize.DATEONLY },
        ceoId: { type: Sequelize.INTEGER },
        ceoFinalDecision: { type: Sequelize.STRING },
        ceoDate: { type: Sequelize.DATEONLY },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
        uuid:{
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4 // Or Sequelize.UUIDV1
		  }

	    }
    ,{
        freezeTableName: true
    });
    const empevaluationVersion = new Version(Empevaluation);

    return Empevaluation;

};
