/**
 * @file index.js
 */

// Vendors
import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';

import loadComponent from './LoadComponentReducer';

// module Reducers
import editPatient from './app/modules/editPatient/EditPatientReducer';
import patientBaseInfo from './app/modules/editPatient/PatientBaseInfoReducer';
import patientInfo from './app/modules/editPatient/PatientInfoReducer';
import analgesia from './app/modules/editPatient/AnalgesiaReducer';
import observal from './app/modules/editPatient/ObservalReducer';

export default (history, asyncReducers) => combineReducers({

    loadComponent,

    editPatient,
    patientBaseInfo,
    patientInfo,
    analgesia,
    observal,

    router: connectRouter(history),

    ...asyncReducers

});
