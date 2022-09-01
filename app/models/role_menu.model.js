const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Role_menu = sequelize.define("role_menu", {

        roleId : { type: Sequelize.INTEGER },
        menuId:  { type: Sequelize.INTEGER },
        menuIdParenId:  { type: Sequelize.INTEGER },
        menuIdType:  { type: Sequelize.STRING },
        menuName:  { type: Sequelize.STRING },
        view :{type: Sequelize.BOOLEAN ,defaultValue:false },
     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
        url:{type: Sequelize.STRING }
	    }
    ,{
        freezeTableName: true
    });
    const role_menuVersion = new Version(Role_menu);

    return Role_menu;

};
