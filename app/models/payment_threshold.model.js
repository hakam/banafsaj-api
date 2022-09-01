const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Payment_threshold = sequelize.define("payment_threshold", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
		name : { type: Sequelize.STRING },
        des: { type: Sequelize.STRING },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
       
    }
    ,{
        freezeTableName: true
    });
    const payment_thresholdVersion = new Version(Payment_threshold);

    return Payment_threshold;

};
