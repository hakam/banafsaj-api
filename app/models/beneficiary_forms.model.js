const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Beneficiaryforms = sequelize.define("beneficiaryforms", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
		name : { type: Sequelize.STRING ,set(value) {
            this.setDataValue('name', value.toLowerCase());
        }},
        descrpition : { type: Sequelize.STRING },
        label : { type: Sequelize.STRING },
        projectId : { type: Sequelize.INTEGER },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
       
    }
    ,{
        freezeTableName: true
    });
    const beneficiaryformsVersion = new Version(Beneficiaryforms);

    return Beneficiaryforms;

};
