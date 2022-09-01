const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Doclist = sequelize.define("doclist", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
        name: { type: Sequelize.STRING ,set(value) {
            this.setDataValue('name', value.toLowerCase());
        }},
        description: { type: Sequelize.STRING,set(value) {
            this.setDataValue('description', value.toLowerCase());
        } },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
	    }
    ,{
        freezeTableName: true
    });

        const doclistVersion = new Version(Doclist);

    return Doclist;

};
