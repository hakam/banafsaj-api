const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Filters = sequelize.define("filters", {

        handle : { type: Sequelize.STRING },
        title:  { type: Sequelize.STRING },
        icon:  { type: Sequelize.STRING },
       	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
	    }
    ,{
        freezeTableName: true
    });
    const filtersVersion = new Version(Filters);

    return Filters;

};
