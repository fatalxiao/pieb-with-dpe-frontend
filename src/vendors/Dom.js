/**
 * @file Dom.js
 */

export function getOffset(el) {

    if (!el) {
        return null;
    }

    if (el.getBoundingClientRect) {

        const result = el.getBoundingClientRect();

        return {
            top: result.top + getScrollTop(),
            left: result.left + getScrollLeft()
        };

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

export function getScrollHeight() {
    return document.body.scrollHeight || document.documentElement.scrollHeight;
}

export function getScrollLeft() {

    if (window.SCROLL_EL && window.SCROLL_EL.scrollLeft) {
        return SCROLL_EL.scrollLeft;
    }

    return document.body.scrollLeft || document.documentElement.scrollLeft;

}

export function getScrollTop() {

    if (window.SCROLL_EL && window.SCROLL_EL.scrollTop) {
        return SCROLL_EL.scrollTop;
    }

    return document.body.scrollTop || document.documentElement.scrollTop;

}

export function hasClass(el, className) {

    if (!el || !className) {
        return false;
    }

    const elClassName = el.className;

    if (!elClassName) {
        return false;
    }

    const elClass = elClassName.split(/\s+/);

    return elClass.findIndex(item => item === className) !== -1;

}

export function addClass(el, className) {

    if (!el || !className) {
        return;
    }

    const elClassName = el.className;

    if (!elClassName) {
        el.className = className;
        return;
    }

    const elClass = elClassName.split(/\s+/),
        index = elClass.findIndex(item => item === className);

    if (index !== -1) { // already has this className
        return;
    }

    elClass.push(className);
    el.className = elClass.join(' ');

}

export function removeClass(el, className) {

    if (!el || !className) {
        return;
    }

    const elClassName = el.className;

    if (!elClassName) {
        return;
    }

    const elClass = elClassName.split(/\s+/),
        index = elClass.findIndex(item => item === className);

    if (index === -1) { // no this className
        return;
    }

    elClass.splice(index, 1);
    el.className = elClass.join(' ');

}

export function toggleClass(el, className, bool) {
    bool ?
        addClass(el, className)
        :
        removeClass(el, className);
}

export function findParentByClassName(el, className) {

    if (!el || !className) {
        return;
    }

    while (el) {
        if (hasClass(el, className)) {
            return el;
        }
        el = el.parentNode;
    }

    return;

}

export default {
    getOffset,
    getScrollHeight,
    getScrollLeft,
    getScrollTop,
    hasClass,
    addClass,
    removeClass,
    toggleClass,
    findParentByClassName
};
