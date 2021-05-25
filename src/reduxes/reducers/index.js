/**
 * @file index.js
 */

// Vendors
import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';

// common Reducers
import patientGroup from './app/common/PatientGroupReducer';
import patients from './app/common/PatientsReducer';
import sensoryBlock from './app/common/SensoryBlockReducer';
import observalEndPoint from './app/common/ObservalEndPointReducer';
import epPlacementPoint from './app/common/EpPlacementPointReducer';

// module Reducers
import editPatient from './app/modules/editPatient/EditPatientReducer';
import patientBaseInfo from './app/modules/editPatient/PatientBaseInfoReducer';
import patientInfo from './app/modules/editPatient/PatientInfoReducer';
import analgesia from './app/modules/editPatient/AnalgesiaReducer';
import observal from './app/modules/editPatient/ObservalReducer';

export default (history, asyncReducers) => combineReducers({

    patientGroup,
    patients,
    sensoryBlock,
    observalEndPoint,
    epPlacementPoint,

    editPatient,
    patientBaseInfo,
    patientInfo,
    analgesia,
    observal,

    router: connectRouter(history),

    ...asyncReducers

});
