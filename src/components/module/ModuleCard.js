/**
 * @file ModuleCard.js
 */

import React from 'react';
import PropTypes from 'prop-types';

// Components
import Paper from 'alcedo-ui/Paper';

// Vendors
import classNames from 'classnames';

// Styles
import './ModuleCard.scss';

const ModuleCard = ({
    className,
    ...restProps
}) => (
    <Paper {...restProps}
           className={classNames('module-card', {
               [className]: className
           })}/>
);

ModuleCard.propTypes = {
    className: PropTypes.string
};

export default ModuleCard;
