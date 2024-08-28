"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uesScrollPaging = void 0;
var react_1 = require("react");
var lodash_1 = __importDefault(require("lodash"));
var uesScrollPaging = function (_a) {
    var list = _a.list, _b = _a.padding, padding = _b === void 0 ? 200 : _b;
    var containerElementRef = (0, react_1.useRef)();
    var wrapElementRef = (0, react_1.useRef)();
    var itemElementRef = (0, react_1.useRef)([]);
    var moreElementRef = (0, react_1.useRef)();
    var listPrevRef = (0, react_1.useRef)([]);
    var visibleFirstTopRef = (0, react_1.useRef)(-1);
    var visibleLastBotRef = (0, react_1.useRef)(-1);
    var _c = (0, react_1.useState)([]), itemOffset = _c[0], setItemOffset = _c[1];
    var _d = (0, react_1.useState)(0), listTrigger = _d[0], setListTrigger = _d[1];
    var _e = (0, react_1.useState)(0), scrollTrigger = _e[0], setScrollTrigger = _e[1];
    var _f = (0, react_1.useState)(0), minHeight = _f[0], setMinHeight = _f[1];
    var _g = (0, react_1.useState)(0), paddingTop = _g[0], setPaddingTop = _g[1];
    var _h = (0, react_1.useState)(0), fillHeight = _h[0], setFillHeight = _h[1];
    var _j = (0, react_1.useState)(false), end = _j[0], setEnd = _j[1];
    (0, react_1.useEffect)(function () {
        if (!containerElementRef.current) {
            containerElementRef.current = document.querySelector('html') || document.body;
        }
        var throttle = false;
        var timeout;
        var resetOffsetAct = function () {
            if (throttle && timeout)
                clearTimeout(timeout);
            throttle = true;
            timeout = setTimeout(reset, 500);
        };
        window.addEventListener('resize', resetOffsetAct);
        return function () {
            window.removeEventListener('resize', resetOffsetAct);
        };
    }, []);
    (0, react_1.useEffect)(function () {
        var _a;
        if (listPrevRef.current.length === list.length && !lodash_1.default.isEqual(listPrevRef.current, list)) {
            var _loop_1 = function (i) {
                if (!lodash_1.default.isEqual(listPrevRef.current[i], list[i])) {
                    setItemOffset(function (v) { return v.slice(0, i); });
                    setFillHeight(0);
                    return "break";
                }
            };
            for (var i = 0; i < listPrevRef.current.length; i++) {
                var state_1 = _loop_1(i);
                if (state_1 === "break")
                    break;
            }
            listPrevRef.current = lodash_1.default.cloneDeep(list);
            setListTrigger(function (v) { return ++v; });
        }
        else {
            var wrapElement = wrapElementRef.current;
            var containerElement_1 = containerElementRef.current;
            setItemOffset(function (v) {
                if (containerElement_1) {
                    itemElementRef.current.forEach(function (e, i) {
                        if (e && !v[i]) {
                            var top_1 = e.offsetTop;
                            var bot = top_1 + e.clientHeight;
                            v[i] = { top: top_1, bot: bot, visible: 2 };
                        }
                    });
                }
                return v;
            });
            if (wrapElement && containerElement_1) {
                var scrollHeight = containerElement_1.scrollHeight;
                var clientHeight = containerElement_1.clientHeight;
                if (list.length && scrollHeight > clientHeight) {
                    var computedStyle = getComputedStyle(containerElement_1);
                    var paddingTop_1 = parseInt(computedStyle.getPropertyValue('padding-top'));
                    var paddingBot = parseInt(computedStyle.getPropertyValue('padding-bottom'));
                    var containerHeight = scrollHeight - (paddingTop_1 + paddingBot + wrapElement.offsetTop);
                    var moreHeight = ((_a = moreElementRef.current) === null || _a === void 0 ? void 0 : _a.clientHeight) || 0;
                    setMinHeight(containerHeight - moreHeight);
                }
                else {
                    setMinHeight(0);
                }
            }
            setScrollTrigger(function (v) { return ++v; });
        }
    }, [list, listTrigger]);
    (0, react_1.useEffect)(function () {
        var _a;
        scrollEvent(true);
        listPrevRef.current = lodash_1.default.cloneDeep(list);
        if (((_a = containerElementRef.current) === null || _a === void 0 ? void 0 : _a.tagName) === 'HTML') {
            var listener_1 = function () { return scrollEvent(); };
            window.addEventListener('scroll', listener_1);
            return function () {
                window.removeEventListener('scroll', listener_1);
            };
        }
    }, [scrollTrigger]);
    var scrollEvent = function (isRender) {
        if (isRender === void 0) { isRender = false; }
        var containerElement = containerElementRef.current;
        var wrapElement = wrapElementRef.current;
        if (containerElement && wrapElement) {
            var paddingTop_2 = parseInt(getComputedStyle(containerElement).paddingTop);
            var paddingBot = parseInt(getComputedStyle(containerElement).paddingBottom);
            var paddingY_1 = paddingTop_2 + paddingBot;
            var offsetTop_1 = containerElement.offsetTop;
            var scrollTop_1 = containerElement.scrollTop + offsetTop_1;
            var warpTop_1 = wrapElement.offsetTop;
            var scrollBot_1 = scrollTop_1 + containerElement.clientHeight - paddingY_1;
            var firstTop = scrollTop_1 < visibleFirstTopRef.current;
            var lastBot = scrollBot_1 > visibleLastBotRef.current - paddingY_1;
            if (isRender || visibleFirstTopRef.current < 0 || firstTop || lastBot) {
                var first_1 = true;
                var b_1 = itemOffset.length === list.length;
                setItemOffset(function (v1) { return v1.map(function (v2) {
                    v2.visible = scrollTop_1 - padding <= v2.bot && scrollBot_1 + padding + paddingY_1 >= v2.top ? 1 : 0;
                    if (v2.visible === 1 && b_1) {
                        visibleLastBotRef.current = v2.bot;
                        setFillHeight(Math.max(minHeight - (v2.bot - offsetTop_1), 0));
                        if (first_1) {
                            visibleFirstTopRef.current = v2.top;
                            setPaddingTop(v2.top - warpTop_1);
                            first_1 = !first_1;
                        }
                    }
                    return v2;
                }); });
            }
        }
    };
    var reset = function () {
        setItemOffset([]);
        setListTrigger(0);
        setScrollTrigger(0);
        setMinHeight(0);
        setPaddingTop(0);
        setFillHeight(0);
        (0, react_1.useState)(false);
    };
    return {
        container: { scrollEvent: scrollEvent, containerElementRef: containerElementRef },
        wrap: { wrapElementRef: wrapElementRef, minHeight: minHeight, paddingTop: paddingTop },
        item: { list: list, itemOffset: itemOffset, itemElementRef: itemElementRef, fillHeight: fillHeight, end: end },
        more: { moreElementRef: moreElementRef, end: end },
        setEnd: function () { return setEnd(true); },
        reset: reset
    };
};
exports.uesScrollPaging = uesScrollPaging;
