/**
 * @file Util.js
 */

// Statics
import DEFAULT_MENU from 'src/config.menu';

// Vendors
import moment from 'moment';
import Valid from './Valid';

export function getOffset(el) {

    if (!el) {
        return null;
    }

    let offset = {
        top: el.offsetTop,
        left: el.offsetLeft
    };
    while (el.offsetParent) {
        el = el.offsetParent;
        offset.top += el.offsetTop;
        offset.left += el.offsetLeft;
    }

    return offset;

}

export function isEnableLocalStorage() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}

export function isEnableSessionStorage() {
    try {
        return 'sessionStorage' in window && window['sessionStorage'] !== null;
    } catch (e) {
        return false;
    }
}

export function isEnableCookieAndStorage() {
    return navigator.cookieEnabled && isEnableLocalStorage() && isEnableSessionStorage();
}

// function deepCopy(source) {
//
// 	let result = {};
//
// 	for (let key in source) {
// 		if (typeof source[key] === 'object') {
// 			result[key] = deepCopy(source[key]);
// 		} else {
// 			result[key] = source[key];
// 		}
// 	}
//
// 	return result;
//
// }

export function formatCapitalize(value) {
    return value ? value.charAt(0).toUpperCase() + value.substring(1).toLowerCase() : value;
}

export function value2Timestamp(value, format) {

    const defaultValue = new Date().getTime();

    if (typeof value === 'number') {
        return new Date(value).toString() === 'Invalid Date' ? defaultValue : value;
    } else if (typeof value === 'string') {
        let date = moment(value, format);
        return date.isValid() ? date.valueOf() : defaultValue;
    } else if (moment.isDate(value)) {
        let date = moment(value);
        return date.isValid() ? date.valueOf() : defaultValue;
    }

    return defaultValue;

}

export function value2Moment(value, format) {

    const defaultValue = moment();

    if (typeof value === 'string') {
        let date = moment(value, format);
        return date.isValid() ? date : defaultValue;
    } else {
        let date = moment(value);
        return date.isValid() ? date : defaultValue;
    }

}

export function preOrderTraverse(node, callback, deep = 0, parentNode = null) {

    if (callback(node, parentNode, deep) === false) {
        return;
    }

    if (node.children && node.children.length > 0) {
        for (let i = 0, len = node.children.length; i < len; i++) {
            preOrderTraverse(node.children[i], callback, deep + 1, node);
        }
    }

}

export const rootSymbol = null;

export function getActivatedMenu(menu = DEFAULT_MENU, value = location.pathname) {

    let activatedMenu, activatedMenuParent;

    preOrderTraverse({
        [rootSymbol]: true,
        children: menu
    }, (node, parentNode) => {
        if (node && node.route && node.route === value) {
            activatedMenu = node;
            activatedMenuParent = parentNode[rootSymbol] ? null : parentNode;
            return false;
        }
    });

    return {activatedMenu, activatedMenuParent};

}

export function enumerateValue(enumerate) {
    return Object.keys(enumerate).map(key => enumerate[key]);
}

export function resetAriValue(data) {
    let value = [];
    if (data && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            value.push(data[i].id);
        }
    }
    return value;
}

export function resetAriCurrencyValue(data) {
    let value = [];
    if (data && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            value.push({
                id: data[i].id,
                code: data[i].code
            });
        }
    }
    return value;
}

export function recoverAriValue(valueData, baseData) {
    let value = [];
    if (valueData && valueData.length > 0) {
        for (let i = 0; i < valueData.length; i++) {
            for (let j = 0; j < baseData.length; j++) {
                if (valueData[i].id === baseData[j].id || valueData[i] === baseData[j].id) {
                    value.push(baseData[j]);
                }
            }
        }
    }
    return value;
}

export function macthObjectByValue(data, value, valueField) {
    for (let i = 0; i < data.length; i++) {
        if (data[i][valueField] === value) {
            return data[i];
        }
    }
}

export function days2weeksDays(days) {

    if (!days || !Valid.isInteger(days)) {
        return {
            weeks: 0,
            days: 0
        };
    }

    return {
        weeks: ~~(days / 7),
        days: days % 7
    };

}

export function formatString(value) {
    return value === null || value === undefined ? '' : value;
}

export default {
    getOffset,
    isEnableLocalStorage,
    isEnableSessionStorage,
    isEnableCookieAndStorage,
    formatCapitalize,
    value2Timestamp,
    value2Moment,
    preOrderTraverse,
    getActivatedMenu,
    enumerateValue,
    resetAriValue,
    resetAriCurrencyValue,
    recoverAriValue,
    macthObjectByValue,
    days2weeksDays,
    formatString
};
