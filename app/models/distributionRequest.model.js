const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const distributionRequest = sequelize.define("distributionRequest", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
		groupId : { type: Sequelize.STRING },
        distributionRequestType : { type: Sequelize.STRING },
        Code : { type: Sequelize.STRING },
        description : { type: Sequelize.STRING ,set(value) {
            this.setDataValue('description', value.toLowerCase());
        }},
        assetId : { type: Sequelize.INTEGER },
        prId:{type:Sequelize.INTEGER},
        projectId:{type:Sequelize.INTEGER},
        vendorId:{type:Sequelize.INTEGER},
        donorId : { type: Sequelize.INTEGER },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
        hodId: { type: Sequelize.INTEGER },
    }
    ,{
        freezeTableName: true
    });

        const distributionRequestVersion = new Version(distributionRequest);

    return distributionRequest;

};
