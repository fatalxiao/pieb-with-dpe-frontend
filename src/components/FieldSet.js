/**
 * @file FieldSet.js
 */

import React from 'react';
import PropTypes from 'prop-types';

// Vendors
import classNames from 'classnames';

// Styles
import './FieldSet.scss';

const FieldSet = ({
    children,
    className, title,
    ...restProps
}) => (
    <div {...restProps}
         className={classNames('field-set', {
             [className]: className
         })}>

        <h3 className="field-set-title">
            {title}
        </h3>

        <div className="field-set-content">
            {children}
        </div>

    </div>
);

FieldSet.propTypes = {

    children: PropTypes.any,

    className: PropTypes.string,
    title: PropTypes.any

};

export default FieldSet;
