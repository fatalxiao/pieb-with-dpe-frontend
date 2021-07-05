/**
 * @file Nav.js
 */

import React, {useMemo, useState, useCallback, useEffect} from 'react';

// Components
import NavBar from './bar/NavBar';
import NavPatient from './patients/NavPatients';

// Vendors
import classNames from 'classnames';
import Event from 'vendors/Event';
import Valid from 'vendors/Valid';

// Styles
import './Nav.scss';

const Nav = () => {

    /**
     * 患者栏是否塌缩
     * @type {function(*): boolean}
     */
    const isNavPatientCollapsed = useCallback(navWidth => {
        return navWidth < Nav.NAV_BAR_WIDTH * 2;
    }, []);

    /**
     * 患者栏是否折叠
     * @type {function(*): boolean}
     */
    const isNavPatientFold = useCallback(navWidth => {
        return navWidth < Nav.NAV_BAR_WIDTH + Nav.NAV_PATIENT_WIDTH / 3;
    }, []);

    /**
     * 是否没有移动
     * @type {number}
     */
    const [noMove, setNoMove] = useState(false);

    /**
     * 是否正在 resize
     * @type {number}
     */
    const [resizing, setResizing] = useState(false);

    /**
     * 拖拽的初始宽度
     * @type {number}
     */
    const [startWidth, setStartWidth] = useState(null);

    /**
     * 鼠标的水平偏移量
     * @type {number}
     */
    const [mouseX, setMouseX] = useState(null);

    /**
     * 是否正在拖拽
     * @type {number}
     */
    const [dragging, setDragging] = useState(false);

    /**
     * 当前导航栏的宽度
     * @type {number}
     */
    const [navWidth, setNavWidth] = useState(Nav.INIT_WIDTH);

    /**
     * 当前患者栏是否塌缩
     * @type {number}
     */
    const [navPatientCollapsed, setNavPatientCollapsed] = useState(
        isNavPatientCollapsed(Nav.INIT_WIDTH) || isNavPatientFold(navWidth)
    );

    /**
     * 当前患者栏是否折叠
     * @type {number}
     */
    const [navPatientFold, setNavPatientFold] = useState(isNavPatientFold(navWidth));

    /**
     * 当前导航栏是否折叠
     * @type {boolean}
     */
    const collapsed = useMemo(() => {
        return navWidth === Nav.NAV_BAR_WIDTH;
    }, [
        navWidth
    ]);

    /**
     * 更新导航栏宽度到 local storage
     * @type {function(*=): void}
     */
    const saveNavWidth = useCallback(navWidth => {
        localStorage.setItem('navWidth', navWidth);
    }, []);

    /**
     * 按下鼠标开始拖拽
     * @type {Function}
     */
    const startDrag = useCallback(e => {

        e.stopPropagation();

        setNoMove(true);
        setResizing(true);
        setStartWidth(navWidth);
        setMouseX(e.pageX);

    }, [
        navWidth
    ]);

    /**
     * 处理鼠标拖拽移动
     * @type {Function}
     */
    const handleMouseMove = useCallback(e => {

        e.stopPropagation();

        if (!resizing) {
            return;
        }

        setNoMove(false);

        const offsetX = e.pageX - mouseX,
            nextNavWidth = Valid.range(startWidth + offsetX, Nav.NAV_BAR_WIDTH);

        setDragging(true);
        setNavWidth(nextNavWidth);
        setNavPatientCollapsed(isNavPatientCollapsed(nextNavWidth));
        setNavPatientFold(false);

    }, [
        resizing, mouseX, startWidth, isNavPatientCollapsed
    ]);

    /**
     * 处理鼠标拖拽结束
     * @type {Function}
     */
    const handleMouseUp = useCallback(() => {

        setResizing(false);

        const isFold = isNavPatientFold(navWidth),
            nextNavWidth = isFold ?
                Nav.NAV_BAR_WIDTH
                :
                (navWidth < Nav.DEFAULT_WIDTH ? Nav.DEFAULT_WIDTH : navWidth);

        setDragging(false);
        setNavWidth(nextNavWidth);
        setNavPatientCollapsed(isNavPatientCollapsed(nextNavWidth) || isFold);
        setNavPatientFold(isFold);
        saveNavWidth(nextNavWidth);

    }, [
        isNavPatientCollapsed, isNavPatientFold, navWidth,
        saveNavWidth
    ]);

    /**
     * 切换患者栏显示/塌缩
     * @type {Function}
     */
    const toggleNavPatient = useCallback(e => {

        if (!noMove) {
            return;
        }

        e.stopPropagation();

        setResizing(false);
        setDragging(false);

        const isCollapsed = navWidth === Nav.NAV_BAR_WIDTH;

        setNavWidth(isCollapsed ? Nav.DEFAULT_WIDTH : Nav.NAV_BAR_WIDTH);
        setNavPatientCollapsed(!isCollapsed);
        setNavPatientFold(!isCollapsed);

    }, [
        noMove, navWidth
    ]);

    /**
     * 绑定/解绑 document 上的鼠标移动事件
     */
    useEffect(() => {
        Event.addEvent(document, 'mousemove', handleMouseMove);
        return () => Event.removeEvent(document, 'mousemove', handleMouseMove);
    }, [
        handleMouseMove
    ]);

    /**
     * 绑定/解绑 document 上的鼠标抬起事件
     */
    useEffect(() => {
        Event.addEvent(document, 'mouseup', handleMouseUp);
        return () => Event.removeEvent(document, 'mouseup', handleMouseUp);
    }, [
        handleMouseUp
    ]);

    return (
        <div className={classNames('nav', {
            dragging
        })}
             style={{
                 flexBasis: collapsed ? Nav.NAV_BAR_WIDTH : navWidth
             }}>

            <div className="nav-inner"
                 style={{
                     width: collapsed ? Nav.NAV_BAR_WIDTH : navWidth
                 }}>

                <NavBar isCollapsed={navPatientCollapsed}
                        isFold={navPatientFold}/>

                <NavPatient isCollapsed={navPatientCollapsed}
                            isFold={navPatientFold}/>

                <div className="nav-resize"
                     onMouseDown={startDrag}
                     onMouseUp={toggleNavPatient}>
                    <div className={classNames('nav-toggle', {
                        collapsed
                    })}/>
                </div>

            </div>

        </div>
    );

};

/**
 * 工具栏宽度
 * @type {number}
 */
Nav.NAV_BAR_WIDTH = 64;

/**
 * 患者栏宽度
 * @type {number}
 */
Nav.NAV_PATIENT_WIDTH = 240;

/**
 * 整个导航栏的默认宽度
 * @type {number}
 */
Nav.DEFAULT_WIDTH = Nav.NAV_BAR_WIDTH + Nav.NAV_PATIENT_WIDTH;

/**
 * 初始化宽度
 * @type {number}
 */
Nav.INIT_WIDTH = parseInt(localStorage.getItem('navWidth'), 10) || Nav.DEFAULT_WIDTH;

export default Nav;
