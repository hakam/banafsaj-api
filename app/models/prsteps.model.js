const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Prsteps = sequelize.define("prsteps", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
		description: { type: Sequelize.STRING },
		name : { type: Sequelize.STRING },
        prTypeId: { type: Sequelize.INTEGER },
        roleId: { type: Sequelize.INTEGER },
        period: { type: Sequelize.INTEGER },
        sortOrder: { type: Sequelize.INTEGER },
        departmentId: { type: Sequelize.INTEGER },
        stepType: { type: Sequelize.STRING },
        block: { type: Sequelize.STRING },
        hasNext:{type: Sequelize.BOOLEAN ,defaultValue:false },
        viewType: { type: Sequelize.STRING },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
    }
    ,{
        freezeTableName: true
    });
    const prstepsVersion = new Version(Prsteps);

    return Prsteps;

};
