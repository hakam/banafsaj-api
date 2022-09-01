const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Empcertificate = sequelize.define("empcertificate", {

        createdBy: { type: Sequelize.INTEGER },
        updatedBy: { type: Sequelize.INTEGER },
        certificate: { type: Sequelize.STRING },
        instituteName: { type: Sequelize.STRING ,set(value) {
            this.setDataValue('instituteName', value.toLowerCase());
        }},
        dateofCertificate: { type: Sequelize.DATEONLY },
        employeeId: { type: Sequelize.STRING },
        uuid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4 // Or Sequelize.UUIDV1
        },
        canDelete: { type: Sequelize.BOOLEAN, defaultValue: true },
    }
        , {
            freezeTableName: true
        });
        const empcertificateVersion = new Version(Empcertificate);

    return Empcertificate;

};
