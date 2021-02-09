/**
 * @file index.js
 */

// Vendors
import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';

// App Reducers
import loadComponent from './common/LoadComponentReducer';
import appToaster from './common/ToasterReducer';
import appNotifier from './common/NotifierReducer';
import fullScreen from './common/FullScreenReducer';

// common Reducers
import patientGroup from './app/common/PatientGroupReducer';
import patients from './app/common/PatientsReducer';
import sensoryBlock from './app/common/SensoryBlockReducer';

// module Reducers
import editPatient from './app/modules/editPatient/EditPatientReducer';
import patientBaseInfo from './app/modules/editPatient/PatientBaseInfoReducer';
import patientInfo from './app/modules/editPatient/PatientInfoReducer';
import analgesia from './app/modules/editPatient/AnalgesiaReducer';
import observal from './app/modules/editPatient/ObservalReducer';

export default history => combineReducers({

    loadComponent,
    appToaster,
    appNotifier,
    fullScreen,

    patientGroup,
    patients,
    sensoryBlock,

    editPatient,
    patientBaseInfo,
    patientInfo,
    analgesia,
    observal,

    router: connectRouter(history)

});
