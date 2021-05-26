/**
 * @file EditPatientReducer.js
 */

import * as actionTypes from 'reduxes/actionTypes';

// Vendors
import Valid from 'vendors/Valid';

const initialState = {

    /**
     * 默认的 steps 信息
     */
    steps: [{
        title: 'Patient Information'
    }, {
        title: 'Analgesia Data'
    }, {
        title: 'Observal Data'
    }],

    /**
     * 当前激活的 step 索引
     */
    activatedStep: -1

};

// eslint-disable-next-line complexity, require-jsdoc
function editPatient(state = initialState, action) {
    switch (action.type) {

        /**
         * 上一步
         */
        case actionTypes.PATIENT_STEP_PREV: {
            return {
                ...state,
                activatedStep: Valid.range(state.activatedStep - 1, 0, state.steps.length - 1)
            };
        }

        /**
         * 下一步
         */
        case actionTypes.PATIENT_STEP_NEXT: {

            const activatedStep = Valid.range(state.activatedStep + 1, 0, state.steps.length - 1),
                finishedStep = state.finishedStep > activatedStep ? state.finishedStep : activatedStep;

            return {
                ...state,
                activatedStep,
                finishedStep
            };
        }

        /**
         * 跳转到第几步
         */
        case actionTypes.PATIENT_STEP_UPDATE: {
            return {
                ...state,
                activatedStep: action.activatedStep
            };
        }

        default:
            return state;

    }
}

export default editPatient;
