/**
 * @file ApiMiddleware.js
 */

import * as actionTypes from 'reduxes/actionTypes';

// Actions
import {addSuccessResMsg, addFailureResMsg} from 'reduxes/actions/common/ResMsgAction';

// Vendors
import RequestManagement from 'apis/RequestManagement';

export default store => dispatch => action => {

    const options = action[actionTypes.CALL_API];

    // not an api action
    if (typeof options === 'undefined') {
        return dispatch(action);
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
        delete finalAction[actionTypes.CALL_API];
        return finalAction;
    }

    // dispatch request action
    dispatch(actionWith({type: requestType}));

    api({
        header,
        params,
        contentType,
        successCallback(xhr, response, responseData) {

            !resMsgDisabled && !successResMsgDisabled && addSuccessResMsg()(dispatch);

            dispatch(actionWith({
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

            dispatch(actionWith({
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
