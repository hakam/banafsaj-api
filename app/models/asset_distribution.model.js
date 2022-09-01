const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Assetdistribution = sequelize.define("assetdistribution", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
		assetId : { type: Sequelize.STRING },
        employeeId : { type: Sequelize.STRING },
        dateOfdelivery : { type: Sequelize.STRING },
		accessorises : { type: Sequelize.STRING },
        note : { type: Sequelize.STRING },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
       
    }
    ,{
        freezeTableName: true
    });

        const assetdistributionVersion = new Version(Assetdistribution);

    return Assetdistribution;

};
