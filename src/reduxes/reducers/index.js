/**
 * @file index.js
 */

// Vendors
import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';

// Reducers
import loadComponent from './LoadComponentReducer';

export default (history, asyncReducers) => combineReducers({

    loadComponent,

    router: connectRouter(history),

    ...asyncReducers

});
