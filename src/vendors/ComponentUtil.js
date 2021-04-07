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

    const propsKey = keys[0],
        stateKey = keys.length === 2 ?
            keys[1]
            :
            keys[0],
        prevProps = state.prevProps;

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
