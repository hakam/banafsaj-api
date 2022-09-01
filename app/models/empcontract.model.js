var Tafgeet = require('tafgeetjs');

function currencyToWordsTR(num = 0, curr, format = {}) {
    format = format.minor;
    format = "";
    num = (num += "").split((0.1).toLocaleString().substring(1, 2));
    let frc = (num[1] + "000").substring(0, curr.fraction), a = ", ve ",
        cc = " " + curr.country + (curr.country ? " " : "") + (num[0] > 1 ? curr.majorPlural : curr.majorSingle),
        out = numToWords(num[0]) + (format == "fraction" && num[1] ? "" : cc);
    if (num[1]) {
        let sub = frc > 1 ? curr.minorPlural : curr.minorSingle;
        if (format == "numeric") out += a + (+frc) + " " + sub;
        else if (format == "fraction") out += a + (+frc) + "/1" + "0".repeat(curr.fraction) + cc;
        else out += a + numToWords(frc) + " " + sub;
    }
    return out;
    //----------------------------------------------------------------
    function numToWords(num = 0) {
        if (num == 0) return "";
        num = ("0".repeat(2 * (num += "").length % 3) + num).match(/.{3}/g);
        let out = "",
            T10s = ["", "bir", "iki", "üç", "dört", "beş", "altı", "yedi", "sekiz", "dokuz", "on", "on bir", "on iki", "on üç", "on dört", "on beş", "on altı", "on yedi", "on sekiz", "on dokuz"],
            T20s = ["", "on", "yirmi", "otuz", "kırk", "elli", "altmış", "yetmiş", "seksen", "doksan"],
            sclT = ["", "bin", "milyon", "milyar", "trilyon", "katrilyon"];
        return num.forEach((n, i) => {
            if (+n) {
                let h = +n[0], t = +n.substring(1), scl = sclT[num.length - i - 1];
                out += (out ? " " : "") + (h ? T10s[h] + " Yüz" : "") + (h && t ? " " : "") + (t < 20 ? T10s[t] : T20s[+n[1]] + (+n[2] ? "-" : "") + T10s[+n[2]]);
                out += (out && scl ? " " : "") + scl;
            }
        }), out;
    }
}
let currencyTR = {
    country: "",     // country Name
    majorSingle: "Türk Lirası", // Major Unit Single
    majorPlural: "Türk Lirası",// Major Unit Plural
    minorSingle: "Krş",   // Minor Sub-Unit Single
    minorPlural: "Krş",  // Minor Sub-Unit Plural
    fraction: 2,        // Decimal Places
};
function currencyToWordsEN(num = 0, curr, format = {}) {
    format = format.minor;
    format = "";
    num = (num += "").split((0.1).toLocaleString().substring(1, 2));
    let frc = (num[1] + "000").substring(0, curr.fraction), a = ", and ",
        cc = " " + curr.country + (curr.country ? " " : "") + (num[0] > 1 ? curr.majorPlural : curr.majorSingle),
        out = numToWords(num[0]) + (format == "fraction" && num[1] ? "" : cc);
    if (num[1]) {
        let sub = frc > 1 ? curr.minorPlural : curr.minorSingle;
        if (format == "numeric") out += a + (+frc) + " " + sub;
        else if (format == "fraction") out += a + (+frc) + "/1" + "0".repeat(curr.fraction) + cc;
        else out += a + numToWords(frc) + " " + sub;
    }
    return out;
    //----------------------------------------------------------------
    function numToWords(num = 0) {
        if (num == 0) return "Zero";
        num = ("0".repeat(2 * (num += "").length % 3) + num).match(/.{3}/g);
        let out = "",
            T10s = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"],
            T20s = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"],
            sclT = ["", "Thousand", "Million", "Billion", "Trillion", "Quadrillion"];
        return num.forEach((n, i) => {
            if (+n) {
                let h = +n[0], t = +n.substring(1), scl = sclT[num.length - i - 1];
                out += (out ? " " : "") + (h ? T10s[h] + " Hundred" : "") + (h && t ? " " : "") + (t < 20 ? T10s[t] : T20s[+n[1]] + (+n[2] ? "-" : "") + T10s[+n[2]]);
                out += (out && scl ? " " : "") + scl;
            }
        }), out;
    }
}
let currencyEN = {
    country: "",     // country Name
    majorSingle: "Turkish Lira", // Major Unit Single
    majorPlural: "Turkish Lira",// Major Unit Plural
    minorSingle: "Kurush",   // Minor Sub-Unit Single
    minorPlural: "Kurush",  // Minor Sub-Unit Plural
    fraction: 2,        // Decimal Places
};

let currencyTRUSD = {
    country: "",     // country Name
    majorSingle: "Amerikan Doları", // Major Unit Single
    majorPlural: "Amerikan Doları",// Major Unit Plural
    minorSingle: "Cente",   // Minor Sub-Unit Single
    minorPlural: "Cente",  // Minor Sub-Unit Plural
    fraction: 2,        // Decimal Places
};
let currencyENUSD = {
    country: "",     // country Name
    majorSingle: "USD", // Major Unit Single
    majorPlural: "USD",// Major Unit Plural
    minorSingle: "Cent",   // Minor Sub-Unit Single
    minorPlural: "Cents",  // Minor Sub-Unit Plural
    fraction: 2,        // Decimal Places
};
const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Empcontract = sequelize.define("empcontract", {

        createdBy: { type: Sequelize.INTEGER },
        updatedBy: { type: Sequelize.INTEGER },
        designationId: { type: Sequelize.INTEGER },
        effectiveDate: { type: Sequelize.DATEONLY },
        probationPeriod: { type: Sequelize.INTEGER, defaultValue: 0 },
        branchId: { type: Sequelize.INTEGER },
        salary: { type: Sequelize.DOUBLE },
        salaryType: { type: Sequelize.STRING },
        shiftId: { type: Sequelize.INTEGER },
        currency: { type: Sequelize.STRING },
        location: { type: Sequelize.STRING },
        locationAr: { type: Sequelize.STRING },
        weeklyWorkingDays: { type: Sequelize.STRING },
        holiday: { type: Sequelize.STRING },
        dailyOfceHours: { type: Sequelize.STRING },
        period: { type: Sequelize.STRING },
        terminationDate: { type: Sequelize.DATEONLY },
        type: { type: Sequelize.STRING },
        amountInWriting: { type: Sequelize.STRING },
        amountInWritingTr: { type: Sequelize.STRING },
        amountInWritingAr: { type: Sequelize.STRING },
        employeeId: { type: Sequelize.STRING },
        recruitmentType:{ type: Sequelize.STRING },
        country:{ type: Sequelize.STRING },
        des:{ type: Sequelize.STRING },
        employeeCode:{ type: Sequelize.STRING },
        path:{ type: Sequelize.STRING },
        uuid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4 // Or Sequelize.UUIDV1
        }
        , canDelete: { type: Sequelize.BOOLEAN, defaultValue: true },
    }
        , {
            freezeTableName: true
        });
    Empcontract.afterCreate((empcontract) => {
        const numString = empcontract.salary
        const currency = empcontract.currency
        switch (currency) {
            case "TRY":
                return Empcontract.update({
                    amountInWriting: currencyToWordsEN(numString, currencyEN),
                    amountInWritingTr: currencyToWordsTR(numString, currencyTR),
                    amountInWritingAr: new Tafgeet(numString, 'TRY').parse(),
                }, {
                    where: { id: empcontract.id }
                });
                       
                case "USD":
                    return Empcontract.update({
                        amountInWriting: currencyToWordsEN(numString, currencyENUSD),
                        amountInWritingTr: currencyToWordsTR(numString, currencyTRUSD),
                        amountInWritingAr: new Tafgeet(numString, 'USD').parse(),
                    }, {
                        where: { id: empcontract.id }
                    });   
        }
       
    },
    )
    // Empcontract.afterUpdate((empcontract) => {
    //     const numString = empcontract.salary
    //     return Empcontract.update({
    //         amountInWriting: currencyToWordsEN(numString, currencyEN),
    //         amountInWritingTr: currencyToWordsTR(numString, currencyTR),
    //         amountInWritingAr: new Tafgeet(empcontract.salary, 'TRY').parse(),
    //     }, {
    //         where: { id: empcontract.id }
    //     });
    // },
    // )
    const empcontractVersion = new Version(Empcontract);

    return Empcontract;

};
