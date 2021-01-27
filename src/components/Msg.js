/**
 * @file Msg.js
 */

import React from 'react';
import PropTypes from 'prop-types';

// Vendors
import classNames from 'classnames';
import Util from 'vendors/Util';

// Styles
import './Msg.scss';

const Msg = ({
    children,
    className, type, hasIcon
}) => (
    <div className={classNames('msg', {
        [`theme-${type.theme}`]: type,
        [className]: className
    })}>
        <div className="msg-icon">
            {
                hasIcon ?
                    <i className={`${type.iconCls}`}></i>
                    :
                    null
            }
        </div>
        <div className="msg-text">
            {children}
        </div>
    </div>
);

Msg.Type = {
    ERROR: {
        theme: 'error',
        iconCls: 'icon-circle-with-cross'
    },
    WARNING: {
        theme: 'warning',
        iconCls: 'icon-warning'
    },
    SUCCESS: {
        theme: 'success',
        iconCls: 'icon-check'
    },
    INFO: {
        theme: 'info',
        iconCls: 'icon-info-with-circle'
    }
};

Msg.propTypes = {

    children: PropTypes.any,

    className: PropTypes.string,

    type: PropTypes.oneOf(Util.enumerateValue(Msg.Type)),
    hasIcon: PropTypes.bool

};

Msg.defaultProps = {
    type: Msg.Type.INFO,
    hasIcon: true
};

export default Msg;
