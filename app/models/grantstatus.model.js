const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Grantstatus = sequelize.define("grantstatus", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
		description: { type: Sequelize.STRING },
		name : { type: Sequelize.STRING },
        listView :{type: Sequelize.BOOLEAN ,defaultValue:true },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
    }
    ,{
        freezeTableName: true
    });
    Grantstatus.beforeCreate((grantstatus) => {
        if(grantstatus.name)
        grantstatus.name = grantstatus.name.toLowerCase();
        if(grantstatus.description)
        grantstatus.description = grantstatus.description.toLowerCase();
        return grantstatus
        });
        const grantstatusVersion = new Version(Grantstatus);

    return Grantstatus;

};
