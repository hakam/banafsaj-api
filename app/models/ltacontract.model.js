const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Ltacontract = sequelize.define("ltacontract", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
		prId: { type: Sequelize.INTEGER },
        startDate: { type: Sequelize.DATEONLY },
        endDate: { type: Sequelize.DATEONLY },
        vendorId: { type: Sequelize.INTEGER },
        scope: { type: Sequelize.STRING(1024) },
        name:{ type: Sequelize.STRING(512) },
        uuid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4 // Or Sequelize.UUIDV1
        },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
       
    }
    ,{
        freezeTableName: true
    });
    const ltacontractVersion = new Version(Ltacontract);

    return Ltacontract;

};
