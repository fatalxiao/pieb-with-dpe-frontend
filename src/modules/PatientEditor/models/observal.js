/**
 * @file observal.js
 */

// Apis
import ObservalApi from '../apis/ObservalApi';

/**
 * 格式化 observalData
 * @param observalData
 * @returns {*}
 */
export const formatObservalData = observalData => () => {

    if (!observalData) {
        return null;
    }

    // eslint-disable-next-line no-unused-vars
    const {observalEndPoint, epPlacementPoint, ...restData} = observalData;

    return {
        ...restData,
        observalEndPointId: observalData?.observalEndPoint?.id || null,
        epPlacementPointId: observalData?.epPlacementPoint?.id || null
    };

};

/**
 * 默认的表单数据
 * @type {{}}
 */
const DEFAULT_FORM = {
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
};

export default {
    nameSpace: 'observal',
    state: {

        form: {...DEFAULT_FORM},

        getActionType: null,
        updateActionType: null

    },
    apis: {

        /**
         * 获取某个 patientId 的 Analgesia 数据
         * @param patientId
         * @returns {function(*): *}
         */
        getObservalData: ({patientId}) => dispatchApi => dispatchApi({
            api: ObservalApi.getObservalDataByPatientId,
            params: {patientId},
            successResMsgDisabled: true
        }),

        /**
         * 创建或更新 Observal 数据
         * @param patientId
         * @param callback
         * @param successResMsgDisabled
         * @param failureResMsgDisabled
         * @returns {function(*, *, *): *}
         */
        createOrUpdateObservalData: ({
            patientId,
            callback,
            successResMsgDisabled,
            failureResMsgDisabled = false
        }) => (dispatchApi, dispatch, getState) => {

            const observalData = getState().observal.form;

            if (!patientId || !observalData) {
                return;
            }

            return dispatchApi({
                api: ObservalApi.createOrUpdateObservalData,
                params: {
                    patientId,
                    observalData: formatObservalData(observalData)()
                },
                successResMsgDisabled,
                failureResMsgDisabled,
                successCallback() {
                    callback?.();
                }
            });

        }

    },
    globalReducers: {

        /**
         * 重置数据
         * @param state
         * @returns {*&{data: *[]}}
         */
        resetData: state => {
            return {
                ...state,
                form: {...DEFAULT_FORM}
            };
        }

    },
    reducers: {

        /**
         * 更新 Observal 数据的某个字段
         * @param state
         * @param fieldName
         * @param fieldValue
         * @returns {*&{form}}
         */
        updateObservalField: (state, {fieldName, fieldValue}) => {

            const form = {...state.form};
            form[fieldName] = fieldValue;

            return {
                ...state,
                form
            };

        },

        /**
         * 获取某个 patientId 的 Observal 数据
         * @param state
         * @returns {*&{getActionType: string}}
         */
        getObservalRequest: state => {
            return {
                ...state,
                getActionType: 'observal/getObservalRequest'
            };
        },
        getObservalSuccess: (state, {responseData}) => {
            return {
                ...state,
                getActionType: 'observal/getObservalSuccess',
                form: responseData || {...DEFAULT_FORM}
            };
        },
        getObservalFailure: state => {
            return {
                ...state,
                getActionType: 'observal/getObservalFailure'
            };
        },

        /**
         * 创建或更新 Observal 数据
         * @param state
         * @returns {*&{updateActionType: string}}
         */
        updateObservalRequest: state => {
            return {
                ...state,
                updateActionType: 'observal/updateObservalRequest'
            };
        },
        updateObservalSuccess: state => {
            return {
                ...state,
                updateActionType: 'observal/updateObservalSuccess'
            };
        },
        updateObservalFailure: state => {
            return {
                ...state,
                updateActionType: 'observal/updateObservalFailure'
            };
        }

    }
};
