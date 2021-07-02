/**
 * @file moduleComponentLoading.js
 */

export default {
    nameSpace: 'moduleComponentLoading',
    state: false,
    reducers: {

        /**
         * 开始加载 component
         */
        start: () => {
            return true;
        },

        /**
         * 加载 component 完毕
         */
        complete: () => {
            return false;
        }

    }
};
