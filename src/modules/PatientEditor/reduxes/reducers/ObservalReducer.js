/**
 * @file ObservalReducer.js
 */

import * as actionTypes from '../actionTypes';

const

    /**
     * 默认的表单数据
     * @type {*}
     */
    DEFAULT_FORM = {
        initialTime: '',
        observalEndPoint: null,
        cervixFullyDilatedTime: '',
        epPlacementPoint: null,
        cervixDilatation: '',
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

        form: {...DEFAULT_FORM},

        getActionType: '',
        updateActionType: ''

    };

// eslint-disable-next-line complexity, require-jsdoc
function observal(state = initialState, action) {
    switch (action.type) {

        /**
         * 重置数据
         */
        case actionTypes.RESET_DATA: {
            return {
                ...state,
                form: {...DEFAULT_FORM}
            };
        }

        /**
         * 更新 Observal 数据的某个字段
         */
        case actionTypes.UPDATE_OBSERVAL_FIELD: {

            const form = {...state.form};
            form[action.fieldName] = action.fieldValue;

            return {
                ...state,
                form
            };

        }

        /**
         * 获取某个 patientId 的 Observal 数据
         */
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
                form: action.responseData || {...DEFAULT_FORM}
            };
        }
        case actionTypes.GET_OBSERVAL_FAILURE: {
            return {
                ...state,
                getActionType: actionTypes.GET_OBSERVAL_FAILURE
            };
        }

        /**
         * 创建或更新 Observal 数据
         */
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
