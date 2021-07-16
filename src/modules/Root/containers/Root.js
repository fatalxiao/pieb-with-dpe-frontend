/**
 * @file Root.js
 */

import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {renderRoutes} from 'react-router-config';
import {Redirect} from 'react-router-dom';

// Components
import Toaster from 'alcedo-ui/Toaster';
import Notifier from 'alcedo-ui/Notifier';

// Statics
import {DEFAULT_ROUTE} from 'src/routes';

// Styles
import './Root.scss';

const Root = ({
    toasts, notifications, route, location,
    dispatch
}) => {

    /**
     * 处理 toasts 出栈
     * @type {(function(): void)|*}
     */
    const clearToasts = useCallback(() => {
        dispatch?.({
            type: 'toasts/clearToasts'
        });
    }, [
        dispatch
    ]);

    /**
     * 处理 notifications 出栈
     * @type {(function(): void)|*}
     */
    const clearNotifications = useCallback(() => {
        dispatch?.({
            type: 'notifications/clearNotifications'
        });
    }, [
        dispatch
    ]);

    return (
        <div className="root">

            <Toaster toasts={toasts}
                     position={Toaster.Position.TOP}
                     onToastPop={clearToasts}/>

            <Notifier notifications={notifications}
                      position={Notifier.Position.TOP_RIGHT}
                      onNotificationPop={clearNotifications}
                      duration={8000}/>

            {renderRoutes(route.routes)}

            {
                location.pathname === '/' ?
                    <Redirect from="/" to={DEFAULT_ROUTE}/>
                    :
                    null
            }

        </div>
    );

};

Root.propTypes = {

    route: PropTypes.object,
    location: PropTypes.object,

    toasts: PropTypes.array,
    notifications: PropTypes.array,

    dispatch: PropTypes.func

};

export default connect(state => ({
    toasts: state.toasts,
    notifications: state.notifications
}))(Root);
