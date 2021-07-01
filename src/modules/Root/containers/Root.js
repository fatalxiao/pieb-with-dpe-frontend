/**
 * @file Root.js
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {renderRoutes} from 'react-router-config';
import {Redirect} from 'react-router-dom';

// Actions
import * as rootActions from 'modules/Root/reduxes/actions';

// Components
import Toaster from 'alcedo-ui/Toaster';
import Notifier from 'alcedo-ui/Notifier';

// Statics
import {DEFAULT_ROUTE} from 'src/config.routes';

// Styles
import './Root.scss';

const Root = ({
    toastes, notifications, route, location, clearToaste, clearNotifier
}) => (
    <div className="root">

        <Toaster toasts={toastes}
                 position={Toaster.Position.TOP}
                 onToastPop={clearToaste}/>

        <Notifier notifications={notifications}
                  position={Notifier.Position.TOP_RIGHT}
                  onNotificationPop={clearNotifier}
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

    toastes: PropTypes.array,
    notifications: PropTypes.array,

    clearToaste: PropTypes.func,
    clearNotifier: PropTypes.func

};

export default connect(state => ({
    toastes: state.appToaster.toastes,
    notifications: state.appNotifications
}), dispatch => bindActionCreators({
    clearToaste: rootActions.clearToaste,
    clearNotifier: rootActions.clearNotifier
}, dispatch))(Root);
