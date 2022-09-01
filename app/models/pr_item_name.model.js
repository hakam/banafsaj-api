const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Pr_item_name = sequelize.define("pr_item_name", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
		name : { type: Sequelize.STRING },
        des: { type: Sequelize.STRING },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
       
    }
    ,{
        freezeTableName: true
    });
    const pr_item_nameVersion = new Version(Pr_item_name);

    return Pr_item_name;

};
