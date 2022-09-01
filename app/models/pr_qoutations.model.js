const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Prqoutations = sequelize.define("prqoutations", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
        prId:{type:Sequelize.INTEGER},
        projectId:{type:Sequelize.INTEGER},
        vendorId:{type:Sequelize.INTEGER},
        rfqId:{type:Sequelize.INTEGER},
        itemId:{type:Sequelize.INTEGER},
        quantity:{type:Sequelize.DOUBLE},	
        unit:{type:Sequelize.STRING},	
        price:{type:Sequelize.DOUBLE},	
        totalPrice:{type:Sequelize.DOUBLE},	
        currency:{type:Sequelize.STRING},
        exRate:{type:Sequelize.DOUBLE},
        exDate:{type:Sequelize.DATEONLY},	
        exTotalPrice:{type:Sequelize.DOUBLE},	
    }
    ,{
        freezeTableName: true
    });
    const prqoutationsVersion = new Version(Prqoutations);

    return Prqoutations;

};
