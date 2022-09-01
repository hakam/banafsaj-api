const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Empregister = sequelize.define("empregister", {

        createdBy: { type: Sequelize.INTEGER },
        updatedBy: { type: Sequelize.INTEGER },
        firstName: { type: Sequelize.STRING },
        lastName: { type: Sequelize.STRING },
        Mobile: { type: Sequelize.STRING },
        Email: { type: Sequelize.STRING },
        address: { type: Sequelize.STRING },
        birthday: { type: Sequelize.DATEONLY },
        nationality: { type: Sequelize.STRING },
        birthplace: { type: Sequelize.STRING },
        docunemtId: { type: Sequelize.STRING },
        docunemtType: { type: Sequelize.STRING },
        fatherName: { type: Sequelize.STRING },
        motherName: { type: Sequelize.STRING },
        sex: { type: Sequelize.STRING },
        maritalStatus: { type: Sequelize.STRING },
        childrenNo: { type: Sequelize.INTEGER },
        educational: { type: Sequelize.STRING },
        des: { type: Sequelize.STRING(1024) },
        cv: { type: Sequelize.STRING },
        ruuid: { type: Sequelize.STRING },
        uuid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4 // Or Sequelize.UUIDV1
        },
                canDelete: { type: Sequelize.BOOLEAN, defaultValue: true },

    }
        , {
            freezeTableName: true
        });
        const empregisterVersion = new Version(Empregister);

    return Empregister;

};
