/**
 * @file Valid.js
 */

// Vendors
import isArray from 'lodash/isArray';

export function range(value, min, max) {
    max !== undefined && (value = value > max ? max : value);
    min !== undefined && (value = value < min ? min : value);
    return value;
}

export function isChrome() {
    return /chrome/i.test(navigator.userAgent);
}

export function isMac() {
    return /macintosh|mac os x/i.test(navigator.userAgent);
}

export function isWindows() {
    return /windows|win32/i.test(navigator.userAgent);
};

export function isNumber(value) {
    return !Number.isNaN(value);
}

export function isInteger(value) {
    return Number.isInteger(value);
}

export function isPositiveInteger(value) {
    return isInteger(value) && value > 0;
}

export function isNonnegativeInteger(value) {
    return isInteger(value) && value >= 0;
}

export function isNegativeInteger(value) {
    return isInteger(value) && value < 0;
}

export function isNonpositiveInteger(value) {
    return isInteger(value) && value <= 0;
}

export function isOdd(value) {
    return isInteger(value) && value % 2 === 1;
}

export function isEven(value) {
    return isInteger(value) && value % 2 === 0;
}

export function isInRange(value, min, max) {
    return isNumber(value) && isNumber(min) && isNumber(max) && value >= min && value <= max;
}

export function isEmail(value) {
    return /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/.test(value);
}

export function isUrl(value) {
    return /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+$/.test(value);
}

export function isDate(v) {
    return ({}).toString.call(v) === '[object Date]';
}

export function isEmptyObject(obj) {
    try {
        for (let key in obj) {
            return false;
        }
    } catch (e) {
        return true;
    }
}

export function isPerCent(perCent) {
    return isNumber(perCent) && perCent >= 0 && perCent <= 1;
}

export function isDeg(deg) {
    return isNumber(deg) && deg >= 0 && deg <= 360;
}

export function isRGB(rgb) {
    return rgb && isArray(rgb) && rgb.length === 3
        && rgb.filter(item => isInteger(item) && item >= 0 && item <= 255).length === 3;
}

export function isHSB(hsb) {
    return hsb && isArray(hsb) && hsb.length === 3
        && isDeg(hsb[0]) && isInRange(hsb[1], 0, 1) && isInRange(hsb[2], 0, 1);
}

export function isHex(hex, hasHash) {

    if (!hex) {
        return false;
    }

    if ((!hasHash && hex.length !== 6) || (hasHash && hex.length !== 7)) {
        return false;
    }

    if (hasHash && hex[0] !== '#') {
        return false;
    }

    function fn(i) {
        const j = hasHash ? 1 : 0;
        return isInRange(parseInt(hex.slice(i + j, i + j + 2), 16), 0, 255);
    }

    return fn(0) && fn(2) && fn(4);

}

export default {
    range,
    isChrome,
    isMac,
    isWindows,
    isNumber,
    isInteger,
    isPositiveInteger,
    isNonnegativeInteger,
    isNegativeInteger,
    isNonpositiveInteger,
    isOdd,
    isEven,
    isInRange,
    isEmail,
    isUrl,
    isDate,
    isEmptyObject,
    isPerCent,
    isDeg,
    isRGB,
    isHSB,
    isHex
};
