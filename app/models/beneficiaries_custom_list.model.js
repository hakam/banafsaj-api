const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Beneficiaries_custom_list = sequelize.define("beneficiaries_custom_list", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
        projectId: { type: Sequelize.INTEGER },
        customId: { type: Sequelize.INTEGER },
        key: { type: Sequelize.STRING },
        value: { type: Sequelize.STRING },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },      
    }
    ,{
        freezeTableName: true
    });
    const beneficiaries_custom_listVersion = new Version(Beneficiaries_custom_list);

    return Beneficiaries_custom_list;

};
