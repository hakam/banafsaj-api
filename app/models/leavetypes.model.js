const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Leavetypes = sequelize.define("leavetypes", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
        nameId: { type: Sequelize.INTEGER },
        name: { type: Sequelize.STRING },
        description: { type: Sequelize.STRING },
        paidType:  {type: Sequelize.BOOLEAN ,defaultValue:false },
        unit: { type: Sequelize.STRING },
        effectiveAfterCount: { type: Sequelize.INTEGER },
        effectiveAfterUnit: { type: Sequelize.STRING },
        NoOf: { type: Sequelize.INTEGER },
        accrual: { type: Sequelize.STRING },//onetime yearly monthly weekly biwekkly
        applicableGender: { type: Sequelize.STRING },
        applicableMaritalStatus: { type: Sequelize.STRING },
        applicableDepartment: { type: Sequelize.STRING },
        applicableFor: { type: Sequelize.STRING },
        applicableBranch : { type: Sequelize.STRING },
        allEmployee:{type: Sequelize.BOOLEAN ,defaultValue:true },
        exceedLeaveBalance:{type: Sequelize.BOOLEAN ,defaultValue:false },
        days: { type: Sequelize.INTEGER },
        daysTo: { type: Sequelize.INTEGER },
        daysType: { type: Sequelize.STRING },
        displayName: { type: Sequelize.STRING },
        location: { type: Sequelize.STRING },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
        reported:{type: Sequelize.BOOLEAN ,defaultValue:false },
	    }
    ,{
        freezeTableName: true
    });

        Leavetypes.afterCreate((leavetypes) => {
            switch (leavetypes.effectiveAfterUnit) {
                case "year":
                    return Leavetypes.update({
                        days: leavetypes.effectiveAfterCount * 365
                    },{
                        where: { id: leavetypes.id }
                    });
                case "Month":
                    return Leavetypes.update({
                        days: leavetypes.effectiveAfterCount * 30
                    },{
                        where: { id: leavetypes.id }
                    });
            }
        });
        Leavetypes.afterUpdate((leavetypes) => {
            switch (leavetypes.effectiveAfterUnit) {
                case "year":
                    return Leavetypes.update({
                        days: leavetypes.effectiveAfterCount * 365
                    },{
                        where: { id: leavetypes.id }
                    });
                case "Month":
                    return Leavetypes.update({
                        days: leavetypes.effectiveAfterCount * 30
                    },{
                        where: { id: leavetypes.id }
                    });
            }
        });

        const leavetypesVersion = new Version(Leavetypes);

    return Leavetypes;

};
