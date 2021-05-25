/**
 * @file index.js
 */

// Vendors
import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';

// App Reducers
import loadComponent from './LoadComponentReducer';
import appToaster from './ToasterReducer';
import appNotifier from './NotifierReducer';
import fullScreen from './FullScreenReducer';

export default history => combineReducers({

    loadComponent,
    appToaster,
    appNotifier,
    fullScreen,

    router: connectRouter(history)

});
