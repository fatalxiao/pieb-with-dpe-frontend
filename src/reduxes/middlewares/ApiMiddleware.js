/**
 * @file ApiMiddleware.js
 */

import {CALL_API} from 'reduxes/actionTypes';

// Actions
import {addSuccessResMsg, addFailureResMsg} from 'modules/Root/reduxes/actions/ResMsgAction';

// Vendors
import RequestManagement from 'apis/RequestManagement';

export default ({dispatch, getState}) => next => action => {

    const options = action[CALL_API];

    // not an api action
    if (typeof options === 'undefined') {
        return next(action);
    }

    const {

            api, header, params, types, contentType,

            resMsgDisabled, successResMsgDisabled, failureResMsgDisabled,

            successCallback: actionSuccessCallback,
            failureCallback: actionFailureCallback,
            cancelCallback: actionCancelCallback

        } = options,

        [requestType, successType, failureType] = types;

    /**
     * calculate action data
     * @param data
     * @returns {*}
     */
    function actionWith(data) {
        const finalAction = Object.assign({}, action, data);
        delete finalAction[CALL_API];
        return finalAction;
    }

    // next request action
    next(actionWith({type: requestType}));

    api({
        header,
        params,
        contentType,
        successCallback(xhr, response, responseData) {

            !resMsgDisabled && !successResMsgDisabled && addSuccessResMsg()(dispatch);

            next(actionWith({
                type: successType,
                responseData,
                response,
                xhr
            }));

            actionSuccessCallback?.(responseData, response, xhr);

        },
        failureCallback(xhr, response, responseData) {

            if (xhr[RequestManagement.CANCEL_FLAG] === true) {
                actionCancelCallback && actionCancelCallback(xhr);
                return;
            }

            if (!resMsgDisabled && !failureResMsgDisabled) {
                if (xhr.status === 500) {
                    addFailureResMsg()(dispatch);
                } else {
                    addFailureResMsg(responseData)(dispatch);
                }
            }

            next(actionWith({
                type: failureType,
                responseData,
                response,
                xhr,
                error: response ?
                    (responseData || response.message)
                    :
                    'Server or Network failure. Please try again later or contact your account manager.'
            }));

            actionFailureCallback?.(responseData, response, xhr);

        }
    });

};
