const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Branches = sequelize.define("branches", {

        createdBy: { type: Sequelize.INTEGER },
        updatedBy: { type: Sequelize.INTEGER },
        officeId: { type: Sequelize.STRING },
        name: { type: Sequelize.STRING,set(value) {
            this.setDataValue('name', value.toLowerCase());
        }  },
        nameAr: { type: Sequelize.STRING ,set(value) {
            this.setDataValue('nameAr', value.toLowerCase());
        } },
        nameTr: { type: Sequelize.STRING,set(value) {
            this.setDataValue('nameTr', value.toLowerCase());
        }  },
        cityId: { type: Sequelize.INTEGER },
        phone: { type: Sequelize.STRING },
        address: { type: Sequelize.STRING ,set(value) {
            this.setDataValue('address', value.toLowerCase());
        } },
        addressAr: { type: Sequelize.STRING ,set(value) {
            this.setDataValue('addressAr', value.toLowerCase());
        } },
        addressTr: { type: Sequelize.STRING ,set(value) {
            this.setDataValue('addressTr', value.toLowerCase());
        } },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
           }
        , {
            freezeTableName: true
        });

            const branchesVersion = new Version(Branches);

    return Branches;

};
