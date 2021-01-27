import cloneDeep from 'lodash/cloneDeep';
import * as actionTypes from 'reduxes/actionTypes/index';

const DEFAULT_FORM = {
        initialTime: '',
        initialDose: '8',
        pumpConsumption: '',
        bolus: '',
        pcaCount: '',
        manualBolusCount: '',
        firstPcaTime: '',
        firstManualBolusTime: '',
        hasVasoactiveAgent: false,
        hasHypotension: false,
        hasCaesareanSection: false,
        hasInstrumental: false,
        hasLateralEpisiotomy: false,
        birthTime: '',
        foetalWeight: '',
        oneMinuteApgarScore: '',
        fiveMinuteApgarScore: '',
        description: ''
    },
    initialState = {

        form: cloneDeep(DEFAULT_FORM),

        getActionType: '',
        updateActionType: ''

    };

function observal(state = initialState, action) {
    switch (action.type) {

        case actionTypes.RESET_PATIENT_DATA: {
            return {
                ...state,
                form: cloneDeep(DEFAULT_FORM)
            };
        }

        case actionTypes.UPDATE_OBSERVAL_FIELD: {

            const form = cloneDeep(state.form);
            form[action.fieldName] = action.fieldValue;

            return {
                ...state,
                form
            };

        }

        // get observal data
        case actionTypes.GET_OBSERVAL_REQUEST: {
            return {
                ...state,
                getActionType: actionTypes.GET_OBSERVAL_REQUEST
            };
        }
        case actionTypes.GET_OBSERVAL_SUCCESS: {
            return {
                ...state,
                getActionType: actionTypes.GET_OBSERVAL_SUCCESS,
                form: action.responseData || cloneDeep(DEFAULT_FORM)
            };
        }
        case actionTypes.GET_OBSERVAL_FAILURE: {
            return {
                ...state,
                getActionType: actionTypes.GET_OBSERVAL_FAILURE
            };
        }

        // update observal data
        case actionTypes.UPDATE_OBSERVAL_REQUEST: {
            return {
                ...state,
                updateActionType: actionTypes.UPDATE_OBSERVAL_REQUEST
            };
        }
        case actionTypes.UPDATE_OBSERVAL_SUCCESS: {
            return {
                ...state,
                updateActionType: actionTypes.UPDATE_OBSERVAL_SUCCESS
            };
        }
        case actionTypes.UPDATE_OBSERVAL_FAILURE: {
            return {
                ...state,
                updateActionType: actionTypes.UPDATE_OBSERVAL_FAILURE
            };
        }

        default:
            return state;

    }
}

export default observal;
