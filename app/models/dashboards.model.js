const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Dashboards = sequelize.define("dashboards", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
		name : { type: Sequelize.STRING ,set(value) {
            this.setDataValue('name', value.toLowerCase());
        }},
        des: { type: Sequelize.STRING ,set(value) {
            this.setDataValue('des', value.toLowerCase());
        }},
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
       
    }
    ,{
        freezeTableName: true
    });
    const dashboardsVersion = new Version(Dashboards);

    return Dashboards;

};
