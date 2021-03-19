/**
 * @file ModuleLoading.js
 */

import React, {useState, useMemo, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';

// Components
import CircularLoading from 'alcedo-ui/CircularLoading';

// Vendors
import classNames from 'classnames';
import debounce from 'lodash/debounce';

// Styles
import './ModuleLoading.scss';

const ModuleLoading = ({
    children,
    className, loading: propsLoading,
    ...restProps
}) => {

    const [loading, setLoading] = useState(true),

        startLoading = useCallback(() =>
            setLoading(true), []),

        finishLoading = useCallback(() =>
            setLoading(false), []),

        debounceFinishLoading = useMemo(() =>
            debounce(finishLoading, 150), [
            finishLoading
        ]);

    useEffect(() => {
        if (!loading && propsLoading) {
            startLoading();
        } else if (!propsLoading && loading) {
            debounceFinishLoading();
        }
    }, [
        propsLoading, loading,
        startLoading, debounceFinishLoading
    ]);

    return loading ?
        <CircularLoading {...restProps}
                         className={classNames('module-loading', {
                             [className]: className
                         })}/>
        :
        children;

};

ModuleLoading.propTypes = {

    children: PropTypes.any,

    className: PropTypes.string,
    loading: PropTypes.bool

};

ModuleLoading.defaultProps = {
    size: CircularLoading.Size.LARGE
};

export default ModuleLoading;
