/**
 * @file NotifierReducer.js
 */

export default {
    nameSpace: 'appNotifier',
    state: {
        notifiers: []
    },
    reducers: {

        /**
         * 新增一个 Notifier
         */
        addNotifier: (state, action) => {

            if (!action.notifier) {
                return state;
            }

            const notifiers = state.notifiers.slice();
            notifiers.push(action.notifier);

            return {
                ...state,
                notifiers
            };

        },

        /**
         * 更新 Notifiers
         */
        updateNotifiers: (state, action) => {
            return {
                ...state,
                notifiers: action.notifiers
            };
        },

        /**
         * 清除 Notifiers
         */
        clearNotifier: (state, action) => {
            return {
                ...state,
                notifiers: []
            };
        }

    }
};
