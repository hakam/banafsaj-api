const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Beneficiariesproject = sequelize.define("beneficiariesproject", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
       
    }
    ,{
        freezeTableName: true
    });
    const beneficiariesprojectVersion = new Version(Beneficiariesproject);

    return Beneficiariesproject;

};
