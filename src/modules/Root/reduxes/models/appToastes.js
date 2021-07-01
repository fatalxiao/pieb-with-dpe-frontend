/**
 * @file appToastes.js
 */

// Statics
import MsgType from 'alcedo-ui/_statics/MsgType';

export default {
    nameSpace: 'appToastes',
    state: [],
    actions: {

        /**
         * 创建一条 Success 类型的 Toaste
         * @param message
         * @returns {function(*): *}
         */
        addSuccessToaste: ({message}) => dispatch => dispatch({
            type: 'appToastes/addToaste',
            toaste: {
                title: '',
                message,
                iconCls: 'icon-check success',
                type: MsgType.SUCCESS
            }
        }),

        /**
         * 创建一条 Error 类型的 Toaste
         * @param message
         * @returns {function(*): *}
         */
        addErrorToaste: ({message}) => dispatch => dispatch({
            type: 'appToastes/addToaste',
            toaste: {
                title: '',
                message,
                iconCls: 'icon-circle-with-cross error',
                type: MsgType.ERROR
            }
        })

    },
    reducers: {

        /**
         * 创建一条 Toaste
         */
        addToaste: (state, {toaste}) => {

            if (!toaste) {
                return state;
            }

            const toastes = [...state];
            toastes.push(toaste);

            return toastes;

        },

        /**
         * 更新 Toastes
         */
        updateToastes: (state, {toastes}) => {
            return toastes;
        },

        /**
         * 清除 Toastes
         */
        clearToaste: () => {
            return [];
        }

    }
};
