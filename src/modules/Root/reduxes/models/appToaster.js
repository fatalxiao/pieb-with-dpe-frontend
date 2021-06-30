/**
 * @file appToaster.js
 */

export default {
    nameSpace: 'appToaster',
    state: {
        toastes: []
    },
    reducers: {

        /**
         * 创建一条 Toaste
         */
        addToaste: (state, action) => {

            if (!action.toaste) {
                return state;
            }

            const toastes = state.toastes.slice();
            toastes.push(action.toaste);

            return {
                ...state,
                toastes
            };

        },

        /**
         * 更新 Toastes
         */
        updateToastes: (state, action) => {
            return {
                ...state,
                toastes: action.toastes
            };
        },

        /**
         * 清除 Toastes
         */
        clearToaste: (state, action) => {
            return {
                ...state,
                toastes: []
            };
        }

    }
};
