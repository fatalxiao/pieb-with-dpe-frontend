/**
 * @file config.store.js
 */

// Vivy
import Vivy from 'vivy';
import VivyApi from 'vivy-api';
import VivyRouter from 'vivy-router';
import VivyAsyncComponent from 'vivy-async-component';

// Models
import route from 'models/route';
import fullScreen from 'models/fullScreen';
import notifications from 'models/notifications';
import toasts from 'models/toasts';
import responseMessage from 'models/responseMessage';

/**
 * Create Vivy store
 * @param history
 * @returns {*|{}}
 */
export default function configureStore(history) {

    // Create vivy
    const vivy = Vivy();

    // Apply router plugin
    vivy.use(VivyRouter({
        history
    }));

    // Apply async component plugin
    vivy.use(VivyAsyncComponent());

    // Apply api plugin
    vivy.use(VivyApi({
        checkResponseStatus: response => response?.data?.code === 2000,
        successResponseHandler: ({dispatch, getState}) => next => action => {

            const {
                response,
                resMsgDisabled, successResMsgDisabled,
                successCallback
            } = action;
            const responseData = response.data.data;

            !resMsgDisabled && !successResMsgDisabled && dispatch({
                type: 'responseMessage/addSuccessResMsg'
            });

            next({
                ...action,
                responseData
            });

            successCallback?.(responseData, response);

        },
        failureResponseHandler: ({dispatch, getState}) => next => action => {

            const {
                response,
                resMsgDisabled, failureResMsgDisabled,
                failureCallback
            } = action;
            const responseData = response.data.data;

            if (!resMsgDisabled && !failureResMsgDisabled) {
                dispatch({
                    type: 'responseMessage/addFailureResMsg',
                    message: responseData
                });
            }

            next({
                ...action,
                responseData,
                error: response ?
                    (responseData || response.message)
                    :
                    'Server or Network failure. Please try again later or contact your account manager.'
            });

            failureCallback?.(responseData, response);

        }
    }));

    // Create store after configuration
    const store = vivy.createStore();

    // Register model to store
    store.registerModels([
        route,
        fullScreen,
        notifications,
        toasts,
        responseMessage
    ]);

    return store;

}
