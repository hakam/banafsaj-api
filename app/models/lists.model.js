const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Lists = sequelize.define("lists", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
		name : { type: Sequelize.STRING },
        description : { type: Sequelize.STRING },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },

    }
    ,{
        freezeTableName: true
    });
    Lists.beforeCreate((lists) => {
        if(lists.name)
        lists.name = lists.name.toLowerCase();
        if(leavetypes.description)
        leavetypes.description = lists.description.toLowerCase();
        return leavetypes
        });
        const listsVersion = new Version(Lists);

    return Lists;

};
