const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Prscore = sequelize.define("prscore", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
        mandatory :{type: Sequelize.BOOLEAN ,defaultValue:false },
        prId: { type: Sequelize.INTEGER },
        projectId: { type: Sequelize.INTEGER },
        name: { type: Sequelize.STRING },
        description: { type: Sequelize.STRING },
        score: { type: Sequelize.DOUBLE },
        evaluationType: { type: Sequelize.STRING },
       
    }
    ,{
        freezeTableName: true
    });
    const prscoreVersion = new Version(Prscore);

    return Prscore;

};
