const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Beneficiaries_custom = sequelize.define("beneficiaries_custom", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
        projectId: { type: Sequelize.INTEGER },
        value: { type: Sequelize.STRING },
        key: { type: Sequelize.STRING },
        label: { type: Sequelize.STRING },
        order: { type: Sequelize.INTEGER },
        col: { type: Sequelize.STRING },
        controlType: { type: Sequelize.STRING },
        type: { type: Sequelize.STRING },
        required:{type: Sequelize.BOOLEAN ,defaultValue:false },
        formId: { type: Sequelize.INTEGER },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
      
       
    
       
       
       
    }
    ,{
        freezeTableName: true
    });
    const beneficiaries_customVersion = new Version(Beneficiaries_custom);

    return Beneficiaries_custom;

};
