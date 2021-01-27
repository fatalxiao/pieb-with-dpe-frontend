/**
 * @file ModuleAccordion.js
 */

import React, {useRef, useCallback} from 'react';
import PropTypes from 'prop-types';

// Components
import Accordion from 'alcedo-ui/Accordion';

// Vendors
import classNames from 'classnames';

// Styles
import './ModuleAccordion.scss';

const ModuleAccordion = ({
    className,
    ...restProps
}) => {

    const

        /**
         * Accordion 的 reference
         * @type {React.MutableRefObject<undefined>}
         */
        accordionRef = useRef(),

        /**
         * 重设高度
         * @type {function(): *}
         */
        resetHeight = useCallback(() => accordionRef?.current?.resetHeight?.(), [accordionRef]);

    return (
        <Accordion {...restProps}
                   ref={accordionRef}
                   className={classNames('module-accordion', {
                       [className]: className
                   })}/>
    );

};

ModuleAccordion.propTypes = {
    className: PropTypes.string
};

export default ModuleAccordion;
