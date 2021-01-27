/**
 * @file DisplayField.js
 */

import React from 'react';
import PropTypes from 'prop-types';

// Components
import MaterialProvider from 'alcedo-ui/MaterialProvider';

// Vendors
import classNames from 'classnames';

// Styles
import 'components/DisplayField/index.scss';

const DisplayField = ({
    children,
    className, label,
    ...restProps
}) => (
    <MaterialProvider {...restProps}
                      className={classNames('display-field', {
                          [className]: className
                      })}
                      label={label}
                      isLabelAnimate={false}
                      useSeparator={false}>
        <div className="display-field-content">
            {children}
        </div>
    </MaterialProvider>
);

DisplayField.propTypes = {

    children: PropTypes.any,

    className: PropTypes.string,
    label: PropTypes.string

};

export default DisplayField;
