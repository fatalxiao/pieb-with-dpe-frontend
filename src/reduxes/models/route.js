/**
 * @file notifications.js
 */

// Vendors
import {push, replace, go, goBack, goForward} from 'connected-react-router';

export default {
    nameSpace: 'route',
    state: null,
    actions: {

        /**
         * push route
         * @param route
         * @returns {function(*): *}
         */
        push: ({route}) => dispatch => dispatch(push(route)),

        /**
         * replace route
         * @param route
         * @returns {function(*): *}
         */
        replace: ({route}) => dispatch => dispatch(replace(route)),

        /**
         * go route
         * @param route
         * @returns {function(*): *}
         */
        go: ({route}) => dispatch => dispatch(go(route)),

        /**
         * go back route
         * @param route
         * @returns {function(*): *}
         */
        goBack: ({route}) => dispatch => dispatch(goBack()),

        /**
         * go forward route
         * @param route
         * @returns {function(*): *}
         */
        goForward: ({route}) => dispatch => dispatch(goForward())

    }
};
