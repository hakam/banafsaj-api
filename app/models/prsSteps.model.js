const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const PrsSteps = sequelize.define("prsSteps", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
		description: { type: Sequelize.STRING },
		name : { type: Sequelize.STRING },
        prId: { type: Sequelize.INTEGER },
        period: { type: Sequelize.INTEGER },
        roleId: { type: Sequelize.INTEGER },
        sortOrder: { type: Sequelize.INTEGER },
        departmentId: { type: Sequelize.INTEGER },
        done:{type: Sequelize.BOOLEAN ,defaultValue:false },
        hasNext:{type: Sequelize.BOOLEAN ,defaultValue:false },
        viewType: { type: Sequelize.STRING },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
    }
    ,{
        freezeTableName: true
    });
    const prsStepsVersion = new Version(PrsSteps);

    return PrsSteps;

};
