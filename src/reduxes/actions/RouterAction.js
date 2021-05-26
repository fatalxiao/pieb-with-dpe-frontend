/**
 * @file RouterAction.js
 */

// Vendors
import {push, replace, go, goBack, goForward} from 'connected-react-router';

/**
 * push route
 * @param route
 * @returns {function(*): *}
 */
export const routerPush = route => dispatch => dispatch(push(route));

/**
 * replace route
 * @param route
 * @returns {function(*): *}
 */
export const routerReplace = route => dispatch => dispatch(replace(route));

/**
 * go to route
 * @param route
 * @returns {function(*): *}
 */
export const routerGo = route => dispatch => dispatch(go(route));

/**
 * go back
 * @returns {function(*): *}
 */
export const routerGoBack = () => dispatch => dispatch(goBack());

/**
 * go forward
 * @returns {function(*): *}
 */
export const routerGoForward = () => dispatch => dispatch(goForward());
