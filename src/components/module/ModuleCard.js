/**
 * @file ModuleCard.js
 */

import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';

// Components
import Paper from 'alcedo-ui/Paper';

// Vendors
import classNames from 'classnames';

// Styles
import './ModuleCard.scss';

const ModuleCard = forwardRef(({
    className,
    ...restProps
}, ref) => (
    <Paper {...restProps}
           ref={ref}
           className={classNames('module-card', {
               [className]: className
           })}/>
));

ModuleCard.propTypes = {
    className: PropTypes.string
};

export default ModuleCard;
