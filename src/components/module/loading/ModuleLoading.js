/**
 * @file ModuleLoading.js
 */

import React from 'react';
import PropTypes from 'prop-types';

// Components
import CircularLoading from 'alcedo-ui/CircularLoading';

// Vendors
import classNames from 'classnames';

// Styles
import './ModuleLoading.scss';

const ModuleLoading = ({
    className,
    ...restProps
}) => (
    <CircularLoading {...restProps}
                     className={classNames('module-loading', {
                         [className]: className
                     })}/>
);

ModuleLoading.propTypes = {
    className: PropTypes.string
};

ModuleLoading.defaultProps = {
    size: CircularLoading.Size.LARGE
};

export default ModuleLoading;
