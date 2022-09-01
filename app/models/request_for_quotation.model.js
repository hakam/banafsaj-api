const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Requestforquotation = sequelize.define("requestforquotation", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
        prId:{type:Sequelize.INTEGER},
        projectId:{type:Sequelize.INTEGER},
        vendorId:{type:Sequelize.INTEGER},
        received:{type: Sequelize.BOOLEAN ,defaultValue:false },
        deliveryDate:{type:Sequelize.DATEONLY},
        validityDate:{type:Sequelize.DATEONLY},
        documentPath:{type:Sequelize.STRING},
        uuid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4 // Or Sequelize.UUIDV1
        },
    }
    ,{
        freezeTableName: true
    });
    const requestforquotationVersion = new Version(Requestforquotation);

    return Requestforquotation;

};
