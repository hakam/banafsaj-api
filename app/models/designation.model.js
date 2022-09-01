const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Designation = sequelize.define("designation", {

        createdBy: { type: Sequelize.INTEGER },
        updatedBy: { type: Sequelize.INTEGER },
        officeId: { type: Sequelize.STRING },
        name: { type: Sequelize.STRING ,set(value) {
            this.setDataValue('name', value.toLowerCase());
        }},
        nameTr: { type: Sequelize.STRING ,set(value) {
            this.setDataValue('nameTr', value.toLowerCase());
        }},
        nameAr: { type: Sequelize.STRING ,set(value) {
            this.setDataValue('nameAr', value.toLowerCase());
        }},
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
       
           }
        , {
            freezeTableName: true
        });
            const designationVersion = new Version(Designation);

    return Designation;

};
