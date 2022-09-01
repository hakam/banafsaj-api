const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Tags = sequelize.define("tags", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
		officeId: { type: Sequelize.STRING },
        title: { type: Sequelize.STRING },
        handel: { type: Sequelize.STRING },
        color: { type: Sequelize.STRING },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
        
       
    }
    ,{
        freezeTableName: true
    });

    const tagsVersion = new Version(Tags);
    return Tags;

};
