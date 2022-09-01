const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

	const Employee = sequelize.define("employee", {

		createdBy: { type: Sequelize.INTEGER },
		updatedBy: { type: Sequelize.INTEGER },
		code: {
			type: Sequelize.STRING,
		
		},
		codeNo: { type: Sequelize.INTEGER(5).ZEROFILL.UNSIGNED },
		firstName: {
			type: Sequelize.STRING,
		},
		lastName: {
			type: Sequelize.STRING,
		},
		firstNameAr: { type: Sequelize.STRING },
		lastNameAr: { type: Sequelize.STRING },
		firstNameTr: {
			type: Sequelize.STRING,
		},
		lastNameTr: {
			type: Sequelize.STRING,
		},
		prefix: { type: Sequelize.STRING },
		academic: {
			type: Sequelize.STRING,
		},
		designationId: { type: Sequelize.INTEGER },
		departmentId: { type: Sequelize.INTEGER },
		branchId: { type: Sequelize.INTEGER },
		personalMobileNO: { type: Sequelize.STRING },
		personalEmail: {
			type: Sequelize.STRING,
		
		},
		address: {
			type: Sequelize.STRING(1024),
		
		},
		addressAr: {
			type: Sequelize.STRING(1024),
		
		},
		birthday: { type: Sequelize.DATEONLY },
		nationalityId: { type: Sequelize.INTEGER },
		birthplace: {
			type: Sequelize.STRING,
		
		},
		tc: { type: Sequelize.STRING },
		fatherName: {
			type: Sequelize.STRING,
		
		},
		motherName: {
			type: Sequelize.STRING,
		
		},
		fatherNameAr: { type: Sequelize.STRING },
		motherNameAr: { type: Sequelize.STRING },
		fatherNameTr: {
			type: Sequelize.STRING,
		
		},
		motherNameTr: {
			type: Sequelize.STRING,
		
		},
		partnerName: {
			type: Sequelize.STRING,
				},
		sex: { type: Sequelize.STRING },
		maritalStatus: {
			type: Sequelize.STRING,
		
		},
		maritalStatus: {
			type: Sequelize.STRING,
		
		},
		partnerWork: { type: Sequelize.BOOLEAN, defaultValue: false },
		childrenNo: { type: Sequelize.INTEGER },
		childrenData: {
			type: Sequelize.STRING,
		
		},
		bankAccountNo: { type: Sequelize.STRING(512) },
		bankAccountName: {
			type: Sequelize.STRING,
		
		},
		bankName: {
			type: Sequelize.STRING,
		
		},
		reportToId: { type: Sequelize.INTEGER },
		jobMobileNO: { type: Sequelize.STRING },
		jobEmail: { type: Sequelize.STRING },
		documentType: { type: Sequelize.STRING },
		hod: { type: Sequelize.BOOLEAN, defaultValue: false },
		senedStartDate: { type: Sequelize.DATEONLY },
		disabledEmp: { type: Sequelize.BOOLEAN, defaultValue: false },
		disabledChild: { type: Sequelize.BOOLEAN, defaultValue: false },
		canDelete: { type: Sequelize.BOOLEAN, defaultValue: true },
		avatar: { type: Sequelize.STRING },
		status: { type: Sequelize.STRING, defaultValue:"hired" },
		uuid: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4 // Or Sequelize.UUIDV1
		},
	}
		, {
			freezeTableName: true
		});




	Employee.afterCreate((employee) => {
		return Employee.update({
			code: 'st' + String("00000" + employee.codeNo).slice(-5)
		}, {
			where: { id: employee.id }
		});
	},

	);
	const employeeVersion = new Version(Employee);

	return Employee;

};
