/**
 * @file editPatient.js
 */

// Vendors
import Valid from 'vendors/Valid';

export default {
    nameSpace: 'editPatient',
    state: {

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

    },
    actions: {},
    reducers: {

        /**
         * 上一步
         * @param state
         * @returns {*&{activatedStep}}
         */
        patientStepPrev: state => {
            return {
                ...state,
                activatedStep: Valid.range(state.activatedStep - 1, 0, state.steps.length - 1)
            };
        },

        /**
         * 下一步
         * @param state
         * @returns {{}}
         */
        patientStepNext: state => {

            const activatedStep = Valid.range(state.activatedStep + 1, 0, state.steps.length - 1),
                finishedStep = state.finishedStep > activatedStep ? state.finishedStep : activatedStep;

            return {
                ...state,
                activatedStep,
                finishedStep
            };

        },

        /**
         * 跳转到第几步
         * @param state
         * @param activatedStep
         * @returns {*&{activatedStep}}
         */
        patientStepUpdate: (state, {activatedStep}) => {
            return {
                ...state,
                activatedStep
            };
        }

    }
};
