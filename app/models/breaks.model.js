const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Breaks = sequelize.define("breaks", {

        createdBy: { type: Sequelize.INTEGER },
        updatedBy: { type: Sequelize.INTEGER },
        officeId: { type: Sequelize.STRING },
        name: { type: Sequelize.STRING ,set(value) {
            this.setDataValue('name', value.toLowerCase());
        }},
        payType: {type: Sequelize.BOOLEAN ,defaultValue:false },
        from: { type: Sequelize.TIME },
        to: { type: Sequelize.TIME },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
           }
        , {
            freezeTableName: true
        });

            const breaksVersion = new Version(Breaks);

    return Breaks;

};
