/**
 * @file Root.js
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindModelActionCreators} from 'vivy';

// Components
import {Redirect} from 'react-router-dom';
import Toaster from 'alcedo-ui/Toaster';
import Notifier from 'alcedo-ui/Notifier';

// Statics
import {DEFAULT_ROUTE} from 'src/config.route';

// Vendors
import {renderRoutes} from 'react-router-config';

// Styles
import './Root.scss';

const Root = ({
    toasts, notifications, route, location,
    clearToasts, clearNotifications
}) => (
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

Root.propTypes = {

    route: PropTypes.object,
    location: PropTypes.object,

    toasts: PropTypes.array,
    notifications: PropTypes.array,

    clearToasts: PropTypes.func,
    clearNotifications: PropTypes.func

};

export default connect(state => ({
    toasts: state.toasts,
    notifications: state.notifications
}), dispatch => bindModelActionCreators({
    clearToasts: 'toasts/clearToasts',
    clearNotifications: 'notifications/clearNotifications'
}, dispatch))(Root);
