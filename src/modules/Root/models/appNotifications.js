/**
 * @file appNotifications.js
 */

// Statics
import MsgType from 'alcedo-ui/_statics/MsgType';

export default {
    nameSpace: 'appNotifications',
    state: [],
    actions: {

        /**
         * 新增一个 Info 类型的 Notifier
         * @param message
         * @returns {function(*): *}
         */
        addInfoNotifier: ({message}) => dispatch => dispatch({
            type: 'appNotifications/addNotification',
            notification: {
                title: '',
                message,
                iconCls: 'icon-info-with-circle info',
                type: MsgType.INFO
            }
        }),

        /**
         * 新增一个 Warning 类型的 Notifier
         * @param message
         * @returns {function(*): *}
         */
        addWarningNotifier: ({message}) => dispatch => dispatch({
            type: 'appNotifications/addNotification',
            notification: {
                title: '',
                message,
                iconCls: 'icon-warning warning',
                type: MsgType.WARNING
            }
        })

    },
    reducers: {

        /**
         * 新增一个 Notification
         */
        addNotification: (state, {notification}) => {

            if (!notification) {
                return state;
            }

            const notifications = [...state];
            notifications.push(notification);

            return notifications;

        },

        /**
         * 更新 Notifications
         */
        updateNotifications: (state, {notifications}) => {
            return notifications;
        },

        /**
         * 清除 Notifications
         */
        clearNotifications: () => {
            return [];
        }

    }
};
