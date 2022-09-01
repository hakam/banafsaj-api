const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Pr_payments = sequelize.define("prpayments", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
		name : { type: Sequelize.STRING },
        amount : { type: Sequelize.DOUBLE },
		prId : { type: Sequelize.INTEGER },
		projectId : { type: Sequelize.INTEGER },
		projectEstimationId : { type: Sequelize.INTEGER },
		purchaseRequestId : { type: Sequelize.INTEGER },
		currency : { type: Sequelize.STRING },
        exrate : { type: Sequelize.STRING },
		extotal : { type: Sequelize.DOUBLE },
		dueDate : { type: Sequelize.DATEONLY },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
       
    }
    ,{
        freezeTableName: true
    });
	const prpaymentsVersion = new Version(Pr_payments);

    return Pr_payments;

};
