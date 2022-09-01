const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Beneficiaries_custom_data = sequelize.define("beneficiaries_custom_data", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
        projectId: { type: Sequelize.INTEGER },
        formId: { type: Sequelize.INTEGER },
        beneficiaryId: { type: Sequelize.INTEGER },
        label: { type: Sequelize.STRING },
        value: { type: Sequelize.STRING },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
       
    }
    ,{
        freezeTableName: true
    });
    const beneficiaries_custom_dataVersion = new Version(Beneficiaries_custom_data);

    return Beneficiaries_custom_data;

};
