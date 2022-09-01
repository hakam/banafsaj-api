
class Utils {
    static getFieldNameByInterval(interval, fieldName) {
        if (typeof interval === 'number') {
            return `(${fieldName} - mod(${fieldName} , ${interval}))`;
        }
        else {
            if (/^substr:\d$/.test(interval)) {
                return `SUBSTR(${fieldName}, 1, ${interval.match(/\d+/)[0]})`;
            }
            else
                switch (interval) {
                    case "year":
                        return `TO_CHAR(${fieldName},'YYYY')`;
                    case "month":
                        return `TO_CHAR(${fieldName},'MM')`;
                    case "day":
                        return `TO_CHAR(${fieldName},'DD')`;
                    case "dayOfWeek":
                        return `(TO_CHAR(${fieldName},'D') - 1)`;
                    default: {
                        throw `The /${interval}/ command is not supported`;
                    }
                }
        }
    }
    static getQueryField(queryFields, field) {
        const fieldParts = field.split('.');
        const queryField = queryFields[fieldParts[0].toLowerCase()];
        // validate column name
        if (!queryField) {
            throw `Field "${field}" is not supported in this query`;
        }
        return queryField;
    }
    static toBoolean(value) {
        if (typeof value === 'string')
            return value === 'true';
        return !!value;
    }
    static jsonOrDie(jsonSt, property) {
        try {
            return JSON.parse(jsonSt);
        }
        catch (error) {
            throw `Error while parsing {${property}}`;
        }
    }


    /**
     * A parser for the data processing settings.
     * @param loadOptions An object that will contain converted values.
     *
     * @returns loadOptions
     */
    static loadOptionsParser = (loadOptions) => {
        const options = {};
        options.requireTotalCount = Utils.toBoolean(loadOptions.requireTotalCount);
        options.requireGroupCount = Utils.toBoolean(loadOptions.requireGroupCount);
        options.skip = parseInt(Number(loadOptions.skip).toString());
        options.take = parseInt(Number(loadOptions.take).toString());
        if (loadOptions.sort)
            options.sort = Utils.jsonOrDie(loadOptions.sort, 'Sort');
        if (loadOptions.group)
            options.group = Utils.jsonOrDie(loadOptions.group, 'Group');
        if (loadOptions.filter)
            options.filter = Utils.jsonOrDie(loadOptions.filter, 'Filter');
        if (loadOptions.totalSummary)
            options.totalSummary = Utils.jsonOrDie(loadOptions.totalSummary, 'TotalSummary');
        if (loadOptions.groupSummary)
            options.groupSummary = Utils.jsonOrDie(loadOptions.groupSummary, 'GroupSummary');
        if (loadOptions.select)
            options.select = Utils.jsonOrDie(loadOptions.select, 'Select ');
        return options;
    };



}
module.exports = Utils;