/**
 * @file ComponentUtil.js
 */

// Vendors
import isEqual from 'lodash/isEqual';

/**
 * 用于 getDerivedStateFromProps 时，对某字段做比较
 * @param props
 * @param state
 * @param keys
 * @returns {*}
 */
function getDerivedState(props, state, ...keys) {

    if (!props || !state || !keys || keys.length < 1) {
        return;
    }

    let propsKey = '',
        stateKey = '';

    if (keys.length === 2) {
        propsKey = keys[0];
        stateKey = keys[1];
    } else {
        propsKey = keys[0];
        stateKey = keys[0];
    }

    const prevProps = state.prevProps;

    return prevProps ?
        isEqual(prevProps[propsKey], props[propsKey]) ?
            state[stateKey]
            :
            props[propsKey]
        :
        props[propsKey];

}

export default {
    getDerivedState
};
