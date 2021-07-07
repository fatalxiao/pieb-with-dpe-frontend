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
    actions: {

        /**
         * 重置数据
         * @returns {function(*): *}
         */
        resetPatientData: () => dispatch => dispatch({
            type: 'resetData'
        })

    },
    reducers: {

        /**
         * 上一步
         * @param state
         * @returns {*&{activatedStep}}
         */
        prevPatientStep: state => {
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
        nextPatientStep: state => {

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
        updatePatientStep: (state, {activatedStep}) => {
            return {
                ...state,
                activatedStep
            };
        }

    }
};
