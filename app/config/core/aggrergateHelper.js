
const Utils = require('./utils')

class AggregateHelper {
    static GetFieldSetBySelectors(queryFields, items) {
        let group = "";
        let sort = "";
        let select = "";
        let firstGroupField = "" // use first group for group count query
        for (let index = 0; index < items.length; index++) {
            const item = items[index];
            let groupField = null;
            let selectField = null;
            let sortField = null;

            let desc = false;
            if ((typeof item === 'string') && (item.length)) {

                sortField = groupField = Utils.getQueryField(queryFields, item).databaseName;
                selectField = `${groupField} AS "${groupField}_1"`

            }
            else if (typeof item === "object" && (item.selector)) {

                const column = Utils.getQueryField(queryFields, item.selector)
                const quoteSelector = column.databaseName

                desc = (item.desc) ? item.desc : false;

                if (item.groupInterval) {
                    groupField = Utils.getFieldNameByInterval(item.groupInterval, quoteSelector)
                    selectField = `${groupField} AS "${column.propertyName}_${item.groupInterval}"`
                    sortField = `"${column.propertyName}_${item.groupInterval}"`;
                }

                else {

                    if (item.isExpanded) {
                       sortField= groupField = Utils.getQueryField(queryFields, item.selector).databaseName;
                        selectField = `${groupField} AS "${groupField}_1"`
                      //  sortField = `"${groupField}_1"`;
                    }
                    else {

                        sortField = selectField = groupField = Utils.getQueryField(queryFields, item.selector).databaseName;
                        
                    }

                }
            }
            if (selectField) {
                select += (select.length > 0 ? ", " + selectField : selectField);
            }
            if (groupField) {
                group += (group.length > 0 ? ", " + groupField : groupField);
            }
            if (sortField) {
                sort += (sort.length > 0 ? ", " + sortField : sortField) +
                    (desc ? " DESC" : "");
            }


            if (!firstGroupField)
                firstGroupField = groupField

        }
        return {
            group,
            sort,
            select,
            firstGroupField,
        }
    }
    static GetSummaryInfo(queryFields, expression) {

        const fields = []
        const summaryTypes = [];
        for (let index = 0; index < expression.length; index++) {
            const item = expression[index];
            if (typeof item === 'object' && item.summaryType) {
                summaryTypes.push(item.summaryType.toUpperCase())
                const columnName = item.selector ? Utils.getQueryField(queryFields, item.selector).databaseName : '1'
                const filed = `${summaryTypes[index]}(${columnName}) AS SU_${index}`
                fields.push(filed)
            }
        }
        return { fields: fields.join(','), summaryTypes };
    }



    static IsLastGroupExpanded(items) {
        if (items.length > 0) {
            const lastItem = items[items.length - 1];
            if (typeof lastItem === 'object') {
                return (typeof lastItem.isExpanded === 'boolean') ? lastItem.isExpanded === true : true
            }

        }
        return true;
    }



    static _RecalculateGroupCountAndSummary(dataItem, groupInfo) {
        if (groupInfo.groupIndex <= groupInfo.groupCount - 3) {
            for (let index = 0; index < dataItem.items.length; index++) {
                const items = dataItem.items[index];
                const grInfo = Object.assign({}, groupInfo)
                grInfo.groupIndex++
                this._RecalculateGroupCountAndSummary(items, grInfo)

            }
        }
        if (groupInfo.summaryTypes && groupInfo.groupIndex < groupInfo.groupCount - 2) {
            const result = []
            for (let index = 0; index < dataItem.items.length; index++) {
                const item = dataItem.items[index];
                const currentSummaries = item["summary"]

                if (index == 0) {
                    result.push(...currentSummaries)
                    continue;
                }

                for (let i = 0; i < groupInfo.summaryTypes.length; i++) {
                    const stItem = groupInfo.summaryTypes[i];

                    if (stItem === 'MIN') {
                        if (result[i] > currentSummaries[i]) {
                            result[i] = currentSummaries[i];
                        }
                        continue;
                    }
                    if (stItem === 'MAX') {
                        if (result[i] < currentSummaries[i]) {
                            result[i] = currentSummaries[i];
                        }
                        continue;
                    }
                    result[i] += currentSummaries[i];
                }

            }
            for (let si = 0; si < groupInfo.summaryTypes.length; si++) {
                const stItem = groupInfo.summaryTypes[si];
                if (stItem === 'AVG') {
                    result[si] /= dataItem.items.length;
                }

            }



            dataItem.summary = result;
        }
    }

    static _GetNewGroupItem(row, groupInfo) {
        const groupIndexOffset = groupInfo.lastGroupExpanded ? 1 : 2;
        const groupItem = { key: row[groupInfo.groupIndex] }
        groupItem.items = groupInfo.groupIndex < groupInfo.groupCount - groupIndexOffset ? [] : (groupInfo.lastGroupExpanded ? [] : null);
        if (groupInfo.groupIndex == groupInfo.groupCount - groupIndexOffset) {
            if (groupInfo.summaryTypes) {
                const summaries = []
                const endIndex = groupInfo.groupIndex + groupInfo.summaryTypes.length + 1;
                for (let index = groupInfo.groupCount; index <= endIndex; index++) {
                    summaries.push(row[index]);
                }
                groupItem.summary = summaries;
            }
            if (!groupInfo.lastGroupExpanded) {
                groupItem.count = row[groupInfo.groupIndex + 1];
            }
            else {
                groupItem.items.push(this._GetNewDataItem(row, groupInfo))
            }
        }

        return groupItem;
    }




    static _GetNewDataItem(row, groupInfo) {
        const dataItem = {}

        for (let index = groupInfo.groupCount; index < groupInfo.dataFieldNames.length; index++) {

            const fieldName = groupInfo.dataFieldNames[index].toLowerCase()
            const value = row[index]
            const column = groupInfo.queryFields[fieldName]


            if (!column) {
                Object.assign(dataItem, { [fieldName]: value })
            } else {
                Object.assign(dataItem, column.createValueMap(value))
            }
        }
        return dataItem;
    }

    static _GroupData(row, resultItems, groupInfo) {

        if (!row && !resultItems.length) return
        let currentItem = null;
        const groupIndexOffset = groupInfo.lastGroupExpanded ? 1 : 2;

        if (resultItems.length) {
            currentItem = resultItems[resultItems.length - 1];

            if (!groupInfo.lastGroupExpanded) {
                if (currentItem.key != row[groupInfo.groupIndex] || !row) {
                    if (groupInfo.groupIndex == 0 && groupInfo.groupCount > 2) {
                        this._RecalculateGroupCountAndSummary(currentItem, groupInfo);
                    }
                    currentItem = undefined
                    if (!row) {
                        return;
                    }
                }
            }
            else {
                if (currentItem.key != row[groupInfo.groupIndex]) {
                    currentItem = undefined
                }
                else {
                    if (groupInfo.groupIndex == groupInfo.groupCount - groupIndexOffset) {
                        currentItem.items.push(this._GetNewDataItem(row, groupInfo));
                    }
                }
            }
        }
        if (!currentItem) {
            currentItem = this._GetNewGroupItem(row, groupInfo);
            resultItems.push(currentItem)
        }
        if (groupInfo.groupIndex < groupInfo.groupCount - groupIndexOffset) {
            groupInfo.groupIndex++;
            this._GroupData(row, resultItems[resultItems.length - 1].items, groupInfo);
        }

    }



    static GetGroupedDataFromQuery(queryResult, groupSettings, dataBaseToPropertyMap, queryFields) {

        let result = [];
        let row = null;

        const groupInfo = {
            groupCount: groupSettings.groupCount,
            groupIndex: 0,
            summaryTypes: groupSettings.summaryTypes,
            lastGroupExpanded: groupSettings.lastGroupExpanded,
            dataFieldNames: queryResult && queryResult.length ? Object.keys(queryResult[0]) : [],
            dataBaseToPropertyMap,
            queryFields
        }

        for (let index = 0; index < queryResult.length; index++) {
            row = Object.values(queryResult[index]);
            groupInfo.groupIndex = 0
            this._GroupData(row, result, groupInfo)
        }
        const __gcount = groupSettings.groupCount - (groupSettings.lastGroupExpanded ? 0 : 1);
        if (__gcount > 1) {
            let { take, skip } = groupSettings
            if (skip >= 0 && take >= 1) {
                return result.slice(skip, take + skip)
            }
        }
        return result;
    }
}



module.exports = AggregateHelper