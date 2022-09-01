const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Tasktags = sequelize.define("tasktags", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
		name: { type: Sequelize.STRING },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
      
       
    }
    ,{
        freezeTableName: true
    });
    const tasktagsVersion = new Version(Tasktags);

    return Tasktags;

};
