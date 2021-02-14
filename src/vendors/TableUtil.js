/**
 * @file TableUtil.js
 */

// Vendors
import isEqual from 'lodash/isEqual';

/**
 * 处理 Columns 配置中内容的渲染
 * @param rowData
 * @param prop
 * @param handler
 * @returns {string}
 */
export function cellRenderer(rowData, prop, handler) {
    return rowData && rowData.hasOwnProperty(prop) && rowData[prop] !== null && rowData[prop] !== undefined ?
        handler ?
            handler(rowData[prop])
            :
            rowData[prop]
        :
        '--';
}

export function getDerivedColumns(props, state) {

    if (!props || !state) {
        return [];
    }

    const prevProps = state.prevProps;

    if (prevProps && isEqual(prevProps.columns, props.columns)) {
        return state.columns;
    }

    return props.columns.map(column => {

        const index = state.columns.findIndex(col => col?.key === column?.key);

        if (index < 0 || state.columns[index]?.width === undefined || state.columns[index]?.width === null) {
            return column;
        }

        return {
            ...column,
            width: state.columns[index].width
        };

    });

}

export default {
    cellRenderer,
    getDerivedColumns
};
