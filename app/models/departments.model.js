const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Departments = sequelize.define("departments", {

        name : { type: Sequelize.STRING ,set(value) {
            this.setDataValue('name', value.toLowerCase());
        }},
        description:  { type: Sequelize.STRING },
     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
	    }
    ,{
        freezeTableName: true
    });

        const departmentsVersion = new Version(Departments);

    return Departments;

};
