const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Granttimeline = sequelize.define("granttimeline", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
		officeId: { type: Sequelize.STRING },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
        // action 
        // descriptions
        

       
    }
    ,{
        freezeTableName: true
    });
    const granttimelineVersion = new Version(Granttimeline);

    return Granttimeline;

};
