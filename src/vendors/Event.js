/**
 * @file Event.js
 */

export function addEvent(el, type, cb) {
    if (typeof window.addEventListener === 'function') {
        el.addEventListener(type, cb, false);
    } else if (typeof document.attachEvent === 'function') {
        el.attachEvent(`on${type}`, cb);
    } else {
        el[`on${type}`] = cb;
    }
}

export function removeEvent(el, type, cb) {
    if (typeof window.removeEventListener === 'function') {
        el.removeEventListener(type, cb, false);
    } else if (typeof document.detachEvent === 'function') {
        el.detachEvent(`on${type}`, cb);
    } else {
        el[`on${type}`] = null;
    }
}

export function triggerPopupEventHandle(el, triggerEl, popupEl, currentVisible) {

    let flag = true;

    while (el) {
        if (el == popupEl) {
            return currentVisible;
        } else if (el == triggerEl) {
            return !currentVisible;
        }
        el = el.parentNode;
    }

    if (flag) {
        return false;
    }

}

export function preventContainerScroll(e) {

    const {currentTarget, deltaX, deltaY} = e,
        {
            clientWidth, scrollWidth, scrollLeft,
            clientHeight, scrollHeight, scrollTop
        } = currentTarget;

    if (
        (
            scrollWidth > clientWidth
            &&
            (
                (deltaX < 0 && scrollLeft <= 0)
                ||
                (deltaX > 0 && scrollLeft >= scrollWidth - clientWidth)
            )
        )
        ||
        (
            scrollHeight > clientHeight
            &&
            (
                (deltaY < 0 && scrollTop <= 0)
                ||
                (deltaY > 0 && scrollTop >= scrollHeight - clientHeight)
            )
        )
    ) {
        e.preventDefault();
    }

}

export default {
    addEvent,
    removeEvent,
    triggerPopupEventHandle,
    preventContainerScroll
};
