/**
 * @file loadComponent.js
 */

export default {
    nameSpace: 'loadComponent',
    state: {
        loading: false
    },
    actions: {
        test: action => (dispatch, getState) => {
            console.log('action::', action);
            console.log('dispatch::', dispatch);
            console.log('getState::', getState);
        }
    },
    reducers: {

        /**
         * 开始加载 component
         */
        start: state => {
            return {
                ...state,
                loading: true
            };
        },

        /**
         * 加载 component 完毕
         */
        complete: state => {
            return {
                ...state,
                loading: false
            };
        }

    }
};
