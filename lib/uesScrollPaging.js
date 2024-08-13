"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uesScrollPaging = void 0;
var react_1 = require("react");
var uesScrollPaging = function (_a) {
    var list = _a.list, _b = _a.padding, padding = _b === void 0 ? 200 : _b;
    var containerElementRef = (0, react_1.useRef)();
    var wrapElementRef = (0, react_1.useRef)();
    var itemElementRef = (0, react_1.useRef)([]);
    var moreElementRef = (0, react_1.useRef)();
    var visibleFirstTopRef = (0, react_1.useRef)(-1);
    var visibleLastBotRef = (0, react_1.useRef)(-1);
    var _c = (0, react_1.useState)([]), itemOffset = _c[0], setItemOffset = _c[1];
    var _d = (0, react_1.useState)(0), scrollTrigger = _d[0], setScrollTrigger = _d[1];
    var _e = (0, react_1.useState)(0), minHeight = _e[0], setMinHeight = _e[1];
    var _f = (0, react_1.useState)(0), paddingTop = _f[0], setPaddingTop = _f[1];
    var _g = (0, react_1.useState)(0), fillHeight = _g[0], setFillHeight = _g[1];
    (0, react_1.useEffect)(function () {
        if (!containerElementRef.current) {
            containerElementRef.current = document.querySelector('html') || document.body;
        }
    }, []);
    (0, react_1.useEffect)(function () {
        var _a;
        var wrapElement = wrapElementRef.current;
        var containerElement = containerElementRef.current;
        setItemOffset(function (v) {
            if (containerElement) {
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
        if (wrapElement && containerElement) {
            var scrollHeight = containerElement.scrollHeight;
            var clientHeight = containerElement.clientHeight;
            if (list.length && scrollHeight > clientHeight) {
                var computedStyle = getComputedStyle(containerElement);
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
    }, [list]);
    (0, react_1.useEffect)(function () {
        var _a;
        scrollEvent(true);
        if (((_a = containerElementRef.current) === null || _a === void 0 ? void 0 : _a.tagName) === 'HTML') {
            var listener_1 = function () { return scrollEvent(); };
            window.addEventListener('scroll', listener_1);
            return function () { return window.removeEventListener('scroll', listener_1); };
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
                setItemOffset(function (v) { return v.map(function (v, i) {
                    v.visible = scrollTop_1 - padding <= v.bot && scrollBot_1 + padding + paddingY_1 >= v.top ? 1 : 0;
                    if (v.visible === 1) {
                        visibleLastBotRef.current = v.bot;
                        setFillHeight(Math.max(minHeight - (v.bot - offsetTop_1), 0));
                        if (first_1) {
                            visibleFirstTopRef.current = v.top;
                            setPaddingTop(v.top - warpTop_1);
                            first_1 = !first_1;
                        }
                    }
                    return v;
                }); });
            }
        }
    };
    return {
        container: { scrollEvent: scrollEvent, containerElementRef: containerElementRef },
        wrap: { wrapElementRef: wrapElementRef, minHeight: minHeight, paddingTop: paddingTop },
        item: { list: list, itemOffset: itemOffset, itemElementRef: itemElementRef, fillHeight: fillHeight },
        more: { moreElementRef: moreElementRef },
    };
};
exports.uesScrollPaging = uesScrollPaging;
